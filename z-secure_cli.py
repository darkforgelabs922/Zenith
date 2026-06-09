import os
import sys

def main():
    print("--- ZENITH Z-SECURE CLI v1.5 ---")
    print(f"Active Root: {os.getenv('ROOT_ORCID')}")
    print("Commands: [LATTICE, VAULT, SYNC, RESEARCH]")
    if len(sys.argv) > 1:
        print(f"Executing: {sys.argv[1]}")

if __name__ == '__main__':
    main()
