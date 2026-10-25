import base64

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\public\district-logo-clean.png', 'rb') as f:
    b64_logo = base64.b64encode(f.read()).decode('utf-8')

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\public\ticket-header-bg.png', 'rb') as f:
    b64_header = base64.b64encode(f.read()).decode('utf-8')

content = f'''export const DISTRICT_LOGO_BASE64 = "data:image/png;base64,{b64_logo}";
export const HEADER_BG_BASE64 = "data:image/png;base64,{b64_header}";
'''

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\src\components\logoData.js', 'w', encoding='utf-8') as out:
    out.write(content)

print("Saved logoData.js successfully!")
