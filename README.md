# Lumio Studio - Nunjucks + Vite Implementation

## Task 2: Strict Tech Stack Implementation

**Objective:** Recreate the deliverables from Task 1 using a templating engine + bundler/task runner combination.

---

Here is the Link Preview: https://kesavsoft-task2.netlify.app/

## Technology Stack Choices

✅ **Templating Engine:** Nunjucks - Selected for its powerful inheritance, filters, and macros  
✅ **Bundler/Task Runner:** Vite - Chosen for lightning-fast development experience and optimized builds

**Why this combination?**
- Nunjucks provides template inheritance and component reusability
- Vite offers instant HMR (Hot Module Replacement) during development
- Together they reduce code duplication and improve maintainability
- Perfect for static site generation from reusable templates

---

## Project Structure

```
src/
├── templates/
│   ├── _layout.html              # Base layout template (extends by all pages)
│   ├── index.html                # Home page
│   ├── about.html                # About page
│   ├── contact.html              # Contact page
│   └── components/
│       ├── navbar.html           # Navigation component (reusable)
│       └── footer.html           # Footer component (reusable)
├── assets/
│   ├── css/
│   │   └── style.css             # Custom styles (from Task 1)
│   ├── js/
│   │   └── main.js               # Form validation (from Task 1)
│   └── images/                   # Project images
dist/                             # Build output (generated after npm run build)
package.json                      # Dependencies & scripts
vite.config.js                    # Vite configuration
```

---

## Key Features Implemented

### 1. **Template Inheritance**
```nunjucks
{% extends "_layout.html" %}
{% set title = "Page Title" %}
{% block content %}
  <!-- Unique page content here -->
{% endblock %}
```

### 2. **Reusable Components**
- **Navbar** - Uses `activePage` variable to conditionally highlight current page
- **Footer** - Included in all templates for DRY principle

### 3. **Dynamic Navigation**
- Active page highlighting without manual management
- Set `activePage` variable in each template
- Navbar automatically displays correct active state

### 4. **Asset Organization**
- CSS in `src/assets/css/`
- JavaScript in `src/assets/js/`
- Images in `src/assets/images/`
- Vite manages bundling and optimization

---

## Installation & Getting Started

### Prerequisites
- **Node.js** v14+ → Download: https://nodejs.org/
- **npm** (included with Node.js)

### Quick Setup

```bash
# 1. Navigate to project directory
cd project-UI

# 2. Install dependencies
npm install

# 3. Copy images from root to src/assets/images/
# Windows CMD:
xcopy images src\assets\images /E /I
# macOS/Linux:
cp -r images src/assets/images

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000 in your browser
```

---

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR (http://localhost:3000) |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

---

## How It Works

### Development Flow
1. Edit templates in `src/templates/`
2. Vite watches for changes
3. HMR refreshes browser instantly
4. See updates without full page reload

### Build Process
1. Nunjucks templates are processed with variable substitution
2. Components are included where needed
3. CSS and JS are minified and bundled
4. Assets are optimized
5. Output saved to `dist/` folder

---

## Comparison: Task 1 vs Task 2

| Aspect | Task 1 (Static HTML) | Task 2 (Nunjucks + Vite) |
|--------|----------------------|-------------------------|
| **Pages** | 3 static HTML files | 3 templates + 1 base layout |
| **Navbar/Footer** | Repeated 3x (DRY violation) | 1 component file (DRY) |
| **Updates** | Manual copy-paste | Automatic via inheritance |
| **Build** | None needed | Automated bundling |
| **Asset Management** | Manual linking | Vite handles paths |
| **Active Navigation** | Manual class management | Template variable |

### Code Reduction Example

**Task 1 - Navbar repeated in all 3 files:**
```html
<!-- index.html - full navbar -->
<!-- about.html - same navbar -->
<!-- contact.html - same navbar -->
```

**Task 2 - Navbar in one component:**
```nunjucks
<!-- src/templates/components/navbar.html - once -->
{% include "components/navbar.html" %}  <!-- reused in all pages -->
```

---

## Output: What Gets Generated

When you run `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html        (Compiled from src/templates/index.html)
├── about.html        (Compiled from src/templates/about.html)
├── contact.html      (Compiled from src/templates/contact.html)
├── css/
│   └── style-abc123.css  (Minified & versioned)
├── js/
│   └── [bundled assets]
└── images/
    └── [optimized images]
```

**All 3 HTML files** contain the full navbar and footer HTML (components are resolved during build).

---

## Debugging & Troubleshooting

**Q: Images not showing?**  
A: Ensure images are copied to `src/assets/images/` and paths use `../assets/images/`

**Q: Port 3000 already in use?**  
A: Edit `vite.config.js`: Change `port: 3000` to `port: 3001`

**Q: Template variables not working?**  
A: Verify Nunjucks syntax is correct. Run `npm run build` to check for errors.

**Q: Build fails?**  
A: Delete `node_modules/` and reinstall: `rm -rf node_modules && npm install`

---

## Technology Details

### Nunjucks Features Used
- `{% extends %}` - Template inheritance
- `{% set %}` - Variable definition
- `{% include %}` - Component inclusion
- `{% if %}` - Conditional rendering
- `{% block %}` - Block definition for child templates

### Vite Configuration
- Handles Nunjucks plugin integration
- Multiple entry points (index, about, contact)
- Asset optimization and versioning
- Development server with HMR

--- 
**Task:** Internship Task 2 - Mandatory Technology Stack Implementation using Nunjucks + Vite  
**Status:** ✅ Ready for deployment  
**Last Updated:** 2026
