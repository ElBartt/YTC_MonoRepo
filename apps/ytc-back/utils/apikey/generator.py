import random
import string
import pyperclip # pip install pyperclip

def generate_api_key(length):
    characters = string.ascii_letters + string.digits
    api_key = ''.join(random.choice(characters) for _ in range(length))
    api_key = api_key[:12] + '-' + api_key[13:38] + '_' + api_key[39:49] + '-' + api_key[50:54] + '_' + api_key[55:]
    return api_key

length = 64
api_key = generate_api_key(length)
pyperclip.copy(api_key)
print("API key has been copied to clipboard.")