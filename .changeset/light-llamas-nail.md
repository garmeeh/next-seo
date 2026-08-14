---
"next-seo": patch
---

Escape every `<` when serializing JSON-LD instead of matching known-dangerous sequences. Fixes silent content mutation: `</script>` was matched case-insensitively and replaced with a lowercase literal, so a payload containing `</SCRIPT>` parsed back as `</script>`. Escaping only the `<` leaves every following character untouched, and matches the approach Next.js documents for JSON-LD. Rendered bytes change for payloads containing `<`; parsed values are unchanged, so only snapshot assertions against the raw serialized string are affected.
