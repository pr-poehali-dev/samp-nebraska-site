import socket
import struct
import os

HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def query_samp(ip: str, port: int, timeout: float = 3.0) -> dict:
    """Запрашивает статус SA:MP сервера через UDP протокол."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(timeout)

        # SA:MP query packet: SAMP + ip bytes + port bytes + 'i' (info)
        ip_parts = [int(x) for x in ip.split(".")]
        packet = b"SAMP"
        packet += bytes(ip_parts)
        packet += struct.pack("<H", port)
        packet += b"i"

        sock.sendto(packet, (ip, port))
        data, _ = sock.recvfrom(4096)
        sock.close()

        # Parse response: skip 11 bytes header
        offset = 11
        # password (bool)
        offset += 1
        # players count (uint16)
        players = struct.unpack_from("<H", data, offset)[0]
        offset += 2
        # max players (uint16)
        max_players = struct.unpack_from("<H", data, offset)[0]
        offset += 2
        # hostname length + hostname
        hostname_len = struct.unpack_from("<I", data, offset)[0]
        offset += 4
        hostname = data[offset:offset + hostname_len].decode("cp1251", errors="replace")

        return {
            "online": True,
            "players": players,
            "maxPlayers": max_players,
            "hostname": hostname,
        }
    except Exception:
        return {"online": False, "players": 0, "maxPlayers": 0, "hostname": ""}
    finally:
        try:
            sock.close()
        except Exception:
            pass


def handler(event: dict, context) -> dict:
    """Возвращает статус SA:MP сервера: онлайн/офлайн и количество игроков."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    ip = "188.127.241.74"
    port = 3109

    result = query_samp(ip, port)

    return {
        "statusCode": 200,
        "headers": HEADERS,
        "body": result,
    }