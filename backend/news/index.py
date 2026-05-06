import json
import os
import base64
import uuid
import psycopg2
import boto3

SCHEMA = "t_p58207719_samp_nebraska_site"
HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def handler(event: dict, context) -> dict:
    """Получение списка новостей с пагинацией, или создание новой новости с загрузкой фото."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        page = int(params.get("page", 1))
        limit = int(params.get("limit", 6))
        offset = (page - 1) * limit

        conn = get_db()
        cur = conn.cursor()

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.news")
        total = cur.fetchone()[0]

        cur.execute(
            f"SELECT id, title, text, tag, image_url, created_at FROM {SCHEMA}.news ORDER BY created_at DESC LIMIT %s OFFSET %s",
            (limit, offset),
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        news = [
            {
                "id": r[0],
                "title": r[1],
                "text": r[2],
                "tag": r[3],
                "image_url": r[4],
                "created_at": r[5].strftime("%d %B %Y") if r[5] else "",
            }
            for r in rows
        ]

        return {
            "statusCode": 200,
            "headers": HEADERS,
            "body": {"news": news, "total": total, "page": page, "limit": limit},
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        title = body.get("title", "").strip()
        text = body.get("text", "").strip()
        tag = body.get("tag", "Новость").strip()
        image_b64 = body.get("image")
        image_url = None

        if not title or not text:
            return {"statusCode": 400, "headers": HEADERS, "body": {"error": "title and text are required"}}

        if image_b64:
            s3 = get_s3()
            image_data = base64.b64decode(image_b64)
            key = f"news/{uuid.uuid4()}.jpg"
            s3.put_object(Bucket="files", Key=key, Body=image_data, ContentType="image/jpeg")
            image_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.news (title, text, tag, image_url) VALUES (%s, %s, %s, %s) RETURNING id",
            (title, text, tag, image_url),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {"statusCode": 201, "headers": HEADERS, "body": {"id": new_id}}

    return {"statusCode": 405, "headers": HEADERS, "body": {"error": "Method not allowed"}}
