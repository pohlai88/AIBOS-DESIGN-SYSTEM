# Component Implementation Template
## Figma → Neo-Analog → shadcn Integration

**Date**: 2025-01-27  
**Component Name**: [Will be determined from Figma extraction]  
**Status**: Template Ready

---

## Component Information

- **Figma Node ID**: [To be provided]
- **Component Type**: [Card/Button/Table/Chart/etc.]
- **File Location**: `prototypes/prototype-figma-[component-name].html`
- **Documentation**: `docs/[component-name]-implementation.md`

---

## Design Token Mappings

### Colors
| Figma Variable | Neo-Analog Token | Usage |
|---------------|------------------|-------|
| [To be extracted] | `var(--color-*)` | [Context] |

### Spacing
| Figma Value | Neo-Analog Token | Usage |
|------------|------------------|-------|
| [To be extracted] | `var(--spacing-*)` | [Context] |

### Typography
| Figma Style | Neo-Analog Class | Usage |
|------------|------------------|-------|
| [To be extracted] | `.na-h*` or `.na-data` | [Context] |

---

## shadcn Component Integration

### Components Used
- [ ] Card - `@shadcn/card`
- [ ] Button - `@shadcn/button`
- [ ] Input - `@shadcn/input`
- [ ] Table - `@shadcn/table`
- [ ] Chart - `@shadcn/chart`
- [ ] Other: _______________

### Integration Notes
```typescript
// Example integration pattern
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Apply Neo-Analog classes to shadcn components
<Card className={cn("na-card", className)}>
  <CardHeader>
    <CardTitle className="na-h4">Title</CardTitle>
  </CardHeader>
  <CardContent className="na-content">
    {/* Content */}
  </CardContent>
</Card>
```

---

## Implementation Code

### HTML Structure
```html
<!-- Will be generated from Figma extraction -->
<!-- Uses Neo-Analog semantic classes -->
<!-- Integrates shadcn components -->
```

### CSS Customization
```css
/* Custom styles using design tokens */
/* NO arbitrary values - only tokens */
```

---

## Validation Checklist

- [ ] Passes `pnpm enforce:semantics` (no arbitrary Tailwind classes)
- [ ] Passes `pnpm validate` (design token validation)
- [ ] Uses only Neo-Analog semantic classes
- [ ] Uses only design tokens (no hardcoded values)
- [ ] Follows typography hierarchy (`.na-h1-.na-h6`)
- [ ] Uses Editor's Console pattern (`.na-data` vs `.na-metadata`)
- [ ] shadcn components properly integrated
- [ ] Visual match with Figma design verified

---

## Notes

- Implementation follows `AI_DESIGN_PROTOCOL.md`
- All tokens mapped from Figma to Neo-Analog
- shadcn components styled with design system
- Ready for validation and testing

---

**Next Steps:**
1. Extract design from Figma Desktop
2. Populate token mappings
3. Generate implementation code
4. Validate and test

