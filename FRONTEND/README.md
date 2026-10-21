# RESQ — AI-Assisted Disaster Relief Request Prioritization

A responsive, browser-only frontend prototype for a final-year engineering project. It demonstrates how incoming disaster reports could be organized and prioritized for a relief coordination workflow. **All included records and contacts are fictional. Do not enter real emergency, health, or personally identifying information. This project is not monitored and is not an emergency service.**

## Features

- Operations overview with request totals, priority distribution, weekly trend, recent SOS reports, and response snapshot.
- SOS form with required-field validation, unique request IDs, a local image file picker (no upload or persistence), and an explainable keyword-based prioritization demonstration.
- Searchable and filterable request table with sorting, request details, assignment controls, and status updates.
- Request detail view with extracted fields, classifier explanation, response controls, and status history.
- Fictional rescue team roster and active assignment counts.
- Leaflet incident map using OpenStreetMap tiles and priority-colored fictional markers. It does **not** provide verified safe evacuation routes.
- Analytics for priority, disaster category, status, incoming volume, resource needs, and active team workload.
- Shared state persisted in browser `localStorage`, so requests, assignments, and status changes stay consistent between pages and reloads in the same browser.

## Folder structure

```text
disaster-relief-prioritization/
├── index.html
├── requests.html
├── request-details.html
├── rescue-teams.html
├── map.html
├── analytics.html
├── css/
│   ├── style.css
│   ├── dashboard.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── dashboard.js
│   ├── requests.js
│   ├── request-details.js
│   ├── rescue-teams.js
│   ├── map.js
│   ├── analytics.js
│   └── sample-data.js
└── README.md
```

## Technologies

HTML5, CSS3, vanilla JavaScript, browser `localStorage`, Chart.js, Leaflet, and OpenStreetMap.

## Demonstration NLP and limitations

The current classifier is a **JavaScript keyword-based demonstration**, not a transformer model. It extracts matching urgency phrases, likely disaster category, a best-effort location phrase, and assistance keywords; assigns HIGH, MEDIUM, or LOW; and provides a short rationale. Keyword matching can miss context, misunderstand negation, and produce incorrect priorities. The `classifyMessage` function in `js/app.js` is the replacement boundary for a future secured backend API that could call a BERT/RoBERTa model. A production model should not be exposed directly from the browser and must be evaluated for accuracy, bias, privacy, and operational safety. This prototype has no backend, authentication, server persistence, real dispatch integration, verified incident geocoding, image upload, or validated route guidance.

## Run with VS Code Live Server

1. Open this folder (`disaster-relief-prioritization`) in VS Code.
2. Install/enable the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Use the sidebar to navigate between pages. Chart.js, Leaflet, map tiles, and the optional font are loaded from CDNs and need an internet connection; the core forms, tables, and classifier run locally.

If opening as a `file://` URL, some browser storage behavior may differ; use Live Server for the intended experience. To restore the original fictional sample dataset, clear the `reliefops-demo-v1` key from this site's local storage using browser developer tools.
