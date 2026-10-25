import base64

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\public\exact-district-header.png', 'rb') as f:
    b64_header = base64.b64encode(f.read()).decode('utf-8')

content = f'export const EXACT_HEADER_IMAGE = "data:image/png;base64,{b64_header}";\n'

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\src\components\logoData.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Exact header base64 written successfully!")
