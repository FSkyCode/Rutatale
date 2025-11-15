#!/usr/bin/python3

import random
import sys
import os

def limpiar_pantalla():
    os.system('cls' if os.name == 'nt' else 'clear')
    
class Player:
    def __init__(self):
        self.hp = 30
        self.attack = 6
        self.defense = 3

class Enemy:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk

def generar_enemigo():
    enemigos = [
        Enemy("Slime", 8, 4),
        Enemy("Goblin", 10, 5),
        Enemy("Murciélago", 7, 3),
        Enemy("Esqueleto", 12, 4)
    ]
    return random.choice(enemigos)

def jefe_final():
    return Enemy("DRAGÓN FINAL", 30, 10)

# ===== REGISTROS DE RUTA =====
kills = []       # enemigos derrotados
spared = []      # enemigos perdonados


def combate(player, enemy):
    limpiar_pantalla()
    print(f"\n🔥 ¡Un {enemy.name} aparece! HP enemigo: {enemy.hp}\n")

    while enemy.hp > 0 and player.hp > 0:
        print(f"Tu HP: {player.hp} | HP de {enemy.name}: {enemy.hp}")
        print("Elige tu acción:")
        print("[1] Atacar")
        print("[2] Defender")
        print("[3] Sanarse")
        print("[4] Hablar")

        op = input("> ")

        limpiar_pantalla()

        if op == "1":
            daño = random.randint(player.attack-2, player.attack+2)
            enemy.hp -= daño
            print(f"➡ Atacas e infliges {daño} de daño.")

        elif op == "2":
            print("🛡 Te defiendes y recibes menos daño.")
            daño = max(1, enemy.atk - player.defense*2)
            player.hp -= daño
            print(f"El enemigo te golpea causando {daño}.")
            continue    

        elif op == "3":
            print("✨ Sanas mágicamente.")
            player.hp += 15
            print(f"Tu HP ahora es {player.hp}.")

            if enemy.hp > 0:
                daño = enemy.atk
                player.hp -= daño
                print(f"💥 El {enemy.name} te golpea causando {daño}.")
            continue

        elif op == "4":
            if random.random() < 0.35:
                print(f"💬 Hablas con {enemy.name}… ¡y decide dejarte pasar!")
                spared.append(enemy.name)
                return True
            else:
                print(f"{enemy.name} no te entiende y te ataca.")
        else:
            print("Opción inválida.")
            continue

        if enemy.hp > 0:
            daño = enemy.atk
            player.hp -= daño
            print(f"💥 El {enemy.name} te golpea causando {daño} de daño.")

    if player.hp <= 0:
        print("\n💀 Has sido derrotado… GAME OVER")
        sys.exit()

    print(f"\n✔ Derrotaste a {enemy.name}!\n")
    kills.append(enemy.name)
    return True


# ============================
#   JUEGO PRINCIPAL
# ============================
player = Player()
distancia = 0
meta = 10

print("🔥 AVENTURA INICIADA 🔥")
print("Avanza presionando ESPACIO. Llega a la meta y enfrenta al jefe final.\n")

while distancia < meta:
    tecla = input("Presiona ESPACIO para avanzar: ")

    if tecla.strip() != "":
        print("Solo usa ESPACIO.")
        continue

    distancia += 1
    print(f"➡ Avanzaste. Progreso: {distancia}/{meta}")

    if random.random() < 0.45:
        enemigo = generar_enemigo()
        combate(player, enemigo)

print("🔥 ¡HAS LLEGADO AL JEFE FINAL! 🔥")
combate(player, jefe_final())

print("\n🎉 ¡GANASTE EL JUEGO! ¡ERES UNA LEYENDA! 🎉")
input("\nPresiona ENTER para ver tu RUTA FINAL... ")

# ============================
#      RESULTADO FINAL
# ============================
limpiar_pantalla()
print("📜 RESULTADO DE TU AVENTURA 📜\n")

total = len(kills) + len(spared)

print(f"Enemigos encontrados: {total}")
print(f"Enemigos derrotados: {len(kills)}")
print(f"Enemigos perdonados: {len(spared)}\n")

# rutas principales
if len(kills) == total and total > 0:
    print("🔪 RUTA: GENOCIDA")
elif len(spared) == total and total > 0:
    print("🌱 RUTA: PACIFISTA")
else:
    print("⚖ RUTA: NEUTRAL")

# títulos especiales
if "Slime" in kills and "Esqueleto" in kills:
    print("🏆 TÍTULO ESPECIAL: Cazador de Huesos y Gelatina")

if "Goblin" in spared:
    print("✨ TÍTULO ESPECIAL: Diplomático Goblin")

print("\nGracias por jugar 💖")