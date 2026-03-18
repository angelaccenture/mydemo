**MOVING DEMO OVER TO NEW REPO Connected to ExMod**

Any code modifications to this original source are not intended for production use yet - this is pure DEMO (beta) to prove out requirments can be done in EDS.

## Added Features

### UE / QE Support
* UE Support / QE Support for multiple authoring persona's
* Enhanced Section Grid support with layoutmode for grids
* Can connect to DAM to show preview of image

### Templates
* Within DA, controls styles (Adode working on block control for DA)
* Within UE, controls styles and blocks shown
* Using DA, author can pre-populate the template with blocks

### Advanced Tabs, Accordion and Carousel
* Allows author to add sections and then blocks within

### Advanced Text
* Allows author to add classname in front of each text items using []

### Tag Manager
* Added tagging support page to help manage tags

## Original Features

### Localization & globalization
* Language only support - Ex: en, de, hi, ja
* Region only support - Ex: en-us, en-ca, de-de, de-ch
* Hybrid support - Ex: en, en-us, de, de-ch, de-at
* Fragment-based localized 404s
* Localized Header & Footer
* Do not translate support (#_dnt)

### Flexible section authoring
* Optional containers to constrain content
* Grids: 1-6
* Columns: 1-12
* Color scheme: light, dark
* Gap: xs, s, m, l, xl, xxl
* Spacing: xs, s, m, l, xl, xxl
* Background: token / image / color / gradient

### Base content
* Universal buttons w/ extensive styles
* Images w/ retina breakpoint
* Color scheme support: light, dark
* Modern favicon support
* New window support
* Deep link support
* Modal support

### Header and footer content
* Brand - First link in header
* Main Menu - First list in header
* Actions - Last section of header
* Menu & mega menu support
* Disable header/footer via meta props

### Scheduled content
* Schedule content using spreadsheets

### Sidekick & pre-production
* Quick Edit
* Extensible plumbing for plugins
* Schedule simulator
* Convert production links to relative

### Performance
* Extensible LCP detection

### Developer tools
* Environment detection
* Extensible logging (console, coralogix, splunk, etc.)
* Buildless reactive framework support (Lit)
* Hash utils patterns (#_blank, #_dnt, etc)
* Modern CSS scoping & nesting
* AEM Operational Telemetry

### Operations
* Cloudflare Worker reference implementation

## Patterns
### Page
A page is what holds your content. It can be styled using a metadata property called `template` which will load styles that apply to the entire page.

### Section
A section is a sub-section of your page. It can be styled using a `section-metadata` block. A section will control the layout of blocks.

### Block
Blocks are children of sections. A block adds visual context to parts of a page.

### Auto Block
An auto block is a block generated from a pre-defined piece of content. Often times from a link that matches a particular pattern. Link-based auto blocks can be helpful when additional nesting of content is required.

### Default content
Default content is content that lives outside a block.

## Section Design System

### Spacing & Gap
XS, S, M, L, XL, XXL

### Emphasis
quiet, default, strong, negative

### Buttons
accent, primary, secondary, negative
(w/ outline variations)

### Columns
1 - 12

### Grid
1 - 6

### Color tokens
blue, gray, green, magenta, organge, red, purple, yellow
(w/ 100-900 variations)

### Color schemes
light, dark
