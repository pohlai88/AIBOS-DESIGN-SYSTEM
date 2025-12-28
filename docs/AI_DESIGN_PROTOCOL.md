# Neo-Analog Design System Protocol
## STRICT INSTRUCTION FOR AI AGENTS

**System Status**: ✅ Headless | ✅ Drift-Proof | ✅ Semantic-First

You are creating UI using the **Neo-Analog Design System**. 
**DO NOT** use arbitrary Tailwind classes (e.g., `text-[14px]`, `p-[32px]`, `bg-zinc-900`).  
**YOU MUST** use the semantic `.na-*` utility classes defined below.

**Drift Prevention**: If you use arbitrary values, the semantic linter will fail. Refactor using approved classes.

---

### 1. Typography Hierarchy (Drift Prevention)
**Rule**: Never hardcode font sizes. Use semantic intent.

| Intent | Class | Visual Spec | Context |
| :--- | :--- | :--- | :--- |
| **Page Title** | `.na-h1` | 32px Bold | Top of page, unique H1 |
| **Section Title** | `.na-h2` | 24px Semibold | Major page divisions |
| **Subsection** | `.na-h3` | 20px Semibold | Grouping content within sections |
| **Card Title** | `.na-h4` | 18px Semibold | Inside `.na-card` containers |
| **Small Title** | `.na-h5` | 16px Semibold | Minor groupings |
| **Micro Title** | `.na-h6` | 14px Semibold | Tiny headers, tooltips |

### 2. Data vs Metadata (The "Editor's Console" Logic)
**Rule**: Distinguish strictly between *Label* (Metadata) and *Value* (Content).

- **DATA (Content)** -> `.na-data`
  * *Use for:* Table cells, primary values, user input.
  * *Font:* Monospace/Tabular nums.
- **KPI (Impact)** -> `.na-data-large`
  * *Use for:* Hero numbers, dashboards stats.
  * *Font:* Serif/Display.
- **METADATA (Context)** -> `.na-metadata`
  * *Use for:* Field labels, column headers.
  * *Style:* Uppercase, tracked, dim color.
- **FOOTNOTE (Detail)** -> `.na-metadata-small`
  * *Use for:* Timestamps, IDs, secondary info.

### 3. Layout Semantics (Headless Structure)
**Rule**: Use structural classes, not generic divs.

- **Shell** -> `.na-shell` (Sidebar + Main area grid)
- **Surface** -> `.na-card` (Paper bg, shadow, filament top border)
- **Grouping** -> `.na-panel` (Muted bg, internal separation)
- **Grid** -> `.na-grid` (Standard 24px gap)
- **Content** -> `.na-content` (Standard 32px padding)

### 4. Interactive Components
- **Button** -> `.na-btn` (Standard) or `.na-btn-primary` (Action)
- **Input** -> `.na-input` (Never use default borders)
- **Badge** -> `.na-status` (Use with `.ok`, `.pending`, `.bad`)

### 5. Drift Prevention Checklist
Before generating code, verify:
1. [ ] No `text-[...]` or `text-xs/sm/lg` (Use `.na-h*` or `.na-data`)
2. [ ] No `p-[...]` or `m-[...]` (Use standard Tailwind scale `p-4`, `p-6`)
3. [ ] No hex colors `#...` (Use semantic tokens `text-lux`, `bg-paper`)
4. [ ] No `rounded-[...]` (Use `.na-rounded-card`, `.na-rounded-panel`)

**CORRECT EXAMPLE:**
```html
<div class="na-card">
  <h3 class="na-h4">Revenue</h3>
  <div class="na-data-large">$4,200</div>
  <div class="na-metadata">Last updated 2m ago</div>
</div>
```

**INCORRECT EXAMPLE (Drift):**
```html
<div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800"> <h3 class="text-lg font-bold text-white">Revenue</h3>         <div class="text-3xl font-serif">$4,200</div>                 <div class="text-xs text-gray-500">Last updated...</div>      </div>
```
