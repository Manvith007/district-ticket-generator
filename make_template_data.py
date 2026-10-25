import base64

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\public\ticket_template_clean.png', 'rb') as f:
    b64_tpl = base64.b64encode(f.read()).decode('utf-8')

content = f'export const TICKET_TEMPLATE_BASE64 = "data:image/png;base64,{b64_tpl}";\n'

with open(r'C:\Users\evilg\.gemini\antigravity\scratch\district-ticket-generator\src\components\templateData.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved templateData.js!")
