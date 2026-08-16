# SAJHA — Bharat's Distributed Production Network

> **Turning fragmented rural production capacity into collective access to institutional opportunity.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://sajha-alpha.vercel.app/)
[![Challenge](https://img.shields.io/badge/Challenge-Inclusive%20Innovation%20for%20Bharat-blue)](#)
[![Stage](https://img.shields.io/badge/Stage-Functional%20Prototype-orange)](#)

## Live Prototype

**https://sajha-alpha.vercel.app/**

SAJHA is a functional prototype for inclusive procurement coordination. It demonstrates how a large institutional requirement can be distributed across multiple smaller producer clusters instead of requiring one producer to fulfil the entire order.

---

## The Problem

India has significant production capacity across rural micro-enterprises, self-help groups (SHGs), women-led enterprises, artisans and small manufacturers.

The problem is often not the absence of capacity. It is the mismatch between:

- **fragmented supply** — many small producers with limited individual capacity, and
- **organized institutional demand** — buyers who need large, standardized orders with fixed budgets and deadlines.

For example, an institution may need **1,000 school bags within 30 days**, while an individual rural producer may be able to make only 200.

That producer can be excluded from the opportunity even though their capacity is valuable.

SAJHA explores a different question:

> **Instead of asking who can fulfil the entire order, which combination of capable producers can fulfil it together?**

---

## What SAJHA Does

SAJHA is a proposed **distributed production coordination layer**.

### Core workflow

```text
Institutional Requirement
        ↓
Requirement Structuring
        ↓
Producer-Cluster Matching
        ↓
Pooled Capacity Allocation
        ↓
Explainable Selection
        ↓
Coordinated Fulfillment Plan
```

A buyer provides information such as:

- Product
- Quantity
- Location
- Budget
- Deadline
- Optional inclusion preferences

The prototype then evaluates producer-cluster suitability using factors such as:

- Product/category fit
- Available capacity
- Geographic relevance
- Quality score
- On-time reliability
- Women-led preference

A large requirement can consequently be divided across multiple suitable clusters.

---

## Why This Is Different

SAJHA is **not designed as another seller-listing marketplace**.

A conventional marketplace primarily answers:

> "Which sellers exist?"

SAJHA explores:

> **"Which combination of smaller producers can collectively satisfy this requirement?"**

The key innovation is **pooled-capacity matching**.

This creates a potential pathway for smaller rural enterprises and women-led producer groups to participate in institutional opportunities that may be too large for them individually.

---

## Example

### Buyer requirement

```text
Product:        Cotton school bags
Quantity:       1,000
Location:       Lucknow
Deadline:       30 days
Budget:         ₹180 / unit
Preference:     Women-led producers
```

Instead of requiring one producer to manufacture all 1,000 units, SAJHA can demonstrate a distributed allocation such as:

```text
Producer Cluster A     → 420 units
Producer Cluster B     → 380 units
Producer Cluster C     → 200 units
                         ─────────
                         1,000 units
```

The buyer receives a coordinated plan while participating producers receive achievable allocations.

---

# Prototype Status

**Current stage: Functional Prototype / MVP**

The current deployment demonstrates the core concept through a controlled prototype dataset.

### What is currently demonstrated

- Web-based procurement interface
- Requirement entry/review workflow
- Producer-cluster matching
- Pooled allocation
- Capacity and reliability information
- Inclusion-aware matching preference
- Fulfillment-plan presentation
- Public Vercel deployment

### What is NOT being claimed

The current prototype is **not** presented as:

- A field-tested platform
- A live producer marketplace
- A verified national producer database
- A production payment platform
- A system with real beneficiaries
- A system with measured social-impact results
- A system with formal NGO/government/corporate partnerships

The current data is controlled demonstration data. Real-world validation is the proposed next stage.

---

# Technical Architecture

## Current prototype

```text
┌──────────────────────────────┐
│        User / Buyer          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ React + TypeScript Web App   │
│                              │
│ Requirement → Review → Match │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Matching & Allocation Logic  │
│                              │
│ • Product fit               │
│ • Capacity                  │
│ • Location                  │
│ • Quality / reliability     │
│ • Inclusion preference      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Producer Cluster Results     │
│ + Pooled Allocation          │
│ + Fulfillment Plan           │
└──────────────────────────────┘
```

The current prototype is intentionally self-contained so that the core idea can be demonstrated reliably without depending on the original development environment.

## Planned production architecture

After successful field validation, the architecture can evolve to:

```text
                  ┌───────────────────┐
                  │ Web / Mobile UI   │
                  │ Multilingual UX   │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ API / Application │
                  │     Backend       │
                  └──────┬─────┬──────┘
                         │     │
              ┌──────────┘     └───────────┐
              ▼                            ▼
    ┌─────────────────┐          ┌─────────────────┐
    │ PostgreSQL DB   │          │ AI Service      │
    │                 │          │                 │
    │ Producers       │          │ Requirement     │
    │ Capacity        │          │ understanding   │
    │ Orders          │          │ explanations    │
    │ Allocations     │          │ multilingual    │
    └─────────────────┘          └─────────────────┘
```

This is a **future production architecture**, not a claim that these integrations are already live.

Before real personal or financial data is handled, the production system would require authentication, authorization, consent, data minimization, encryption, audit logging, secure secrets management and appropriate deletion/access controls.

---

# Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Build Tool | Vite 6.4.3 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI |
| Routing | Wouter |
| Client Data State | TanStack Query |
| Visualization | Recharts |
| Icons | Lucide React |
| Source Control | GitHub |
| Deployment | Vercel |
| Current Data | Controlled prototype dataset |
| Current Matching | Deterministic / explainable matching logic |

The current production deployment is a Vite-built web application. Vite's production build generates deployable assets in `dist`, and Vercel supports direct deployment of Vite projects from Git repositories. 

---

# Design Principles

### 1. Inclusion over scale

A producer should not be excluded simply because their individual capacity is small.

### 2. Explainability

The prototype exposes why producer clusters are selected rather than presenting an unexplained recommendation.

### 3. Low barrier to participation

The eventual product is intended to work with producer organizations, SHGs and community partners rather than requiring every small producer to operate sophisticated software independently.

### 4. Measurable impact

The future pilot will measure:

- Producer participation
- Institutional order value reaching producers
- Capacity utilization
- Fulfillment reliability
- Procurement coordination time
- Women-led participation
- Additional livelihood opportunities

### 5. Responsible scaling

The project will move from prototype → controlled pilot → evidence-based expansion rather than claiming national impact before validation.

---

# Pilot Roadmap

## Phase 1 — Prototype

**Current**

- Functional web prototype
- Controlled demonstration data
- Core matching workflow
- Public deployment

## Phase 2 — Controlled Pilot

**Next**

Partner with a small number of:

- Rural producer organizations
- SHG networks
- NGOs
- Institutional buyers

Validate real requirements and real production capacity.

## Phase 3 — Measure

Track:

- Fulfillment rate
- Procurement coordination time
- Capacity utilization
- Producer participation
- Order value
- Women-led participation
- Repeat demand

## Phase 4 — Scale

Expand:

- Across districts
- Across product categories
- Through community organizations
- Through CSR/institutional procurement partnerships

---

# Sustainability Model

A future institutional model could use:

```text
Producer participation
        ↓
Low-cost / free onboarding
        ↓
Institutional buyers
        ↓
Procurement coordination / service fee
        ↓
Platform sustainability
```

Early-stage onboarding and community capacity building could additionally be supported through CSR, development organizations and implementation partners.

The business model remains a **proposed future model** and has not yet been commercially validated.

---

# Social Impact Thesis

SAJHA's central hypothesis is:

> **Collective capability can give small producers access to opportunities that are inaccessible at individual scale.**

If validated, the model could improve access to institutional markets for:

- Rural micro-enterprises
- Women-led enterprises
- Self-help groups
- Artisans
- Small manufacturers

The initial pilot will establish whether this hypothesis translates into measurable economic impact.

---

# Demo

**Live:** https://sajha-alpha.vercel.app/

### Recommended demo journey

1. Open the live application.
2. Enter or select the sample requirement.
3. Review the structured procurement requirement.
4. Select **Find the right collective**.
5. Inspect the recommended producer clusters.
6. Show the pooled allocation.
7. Explain the capacity/reliability/inclusion factors.
8. Show the resulting fulfillment plan.

The submitted demonstration recording is a screen recording without voice-over. The accompanying project documentation provides the written explanation of the workflow.

---

# Development & Deployment

The project is maintained in GitHub and deployed to Vercel.

For a standard Vite production build:

```bash
npm install
npm run build
```

The production output is generated in:

```text
dist/
```

For local preview:

```bash
npm run preview
```

Vite documents `vite build` as the production build command and `dist` as the default deployment output. Vercel supports importing a Vite project directly from Git. 

---

# Project Structure

The main application lives under the `sajha/` application directory.

A simplified structure is:

```text
sajha/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── public/
├── lib/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── ...
```

---

# Responsible Development Note

SAJHA is currently a prototype.

The project deliberately avoids presenting controlled demonstration data as real-world evidence. Any future deployment involving real people or organizations should introduce appropriate:

- Authentication
- Authorization
- Consent
- Data minimization
- Encryption
- Secure secret management
- Audit logging
- Data deletion/access controls
- Producer verification

The prototype therefore demonstrates the **product mechanism**, while field validation and production-grade data infrastructure remain future stages.

---

# Author

**Vini Bharat Bansode**  
B.Tech. Biotechnology, 5th Semester / 3rd Year  
Netaji Subhas University of Technology (NSUT), New Delhi

**Roll No.:** 2024UBT1020  
**Email:** vini.bansode.ug24@nsut.ac.in  
**Phone:** +91 9513054153

---

## Hackathon

**Inclusive Innovation for Bharat**

SAJHA explores inclusive growth through:

- Rural livelihood enhancement
- Inclusive institutional procurement
- Women-led enterprise participation
- Distributed production
- Technology-enabled coordination

---

## Status

**Functional Prototype — Seeking Pilot Validation**

> Built to demonstrate a simple idea: **India's smallest producers can collectively serve opportunities that are too large for any one of them.**
