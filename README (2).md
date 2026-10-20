# ResQ

**AI-assisted prioritization of disaster relief requests using NLP**

ResQ reads emergency messages sent during a disaster, pulls out the key details, and sorts the requests by urgency so responders can see the most critical cases first.

| | |
|---|---|
| **Status** | Planning / design stage |
| **Domain** | NLP, Machine Learning, Disaster Management |
| **Candidate models** | BERT, RoBERTa |
| **Language** | Python |
| **License** | Not yet chosen |

> ResQ is a proposed system. Nothing described here has been built, deployed, or tested yet.

---

## Table of Contents

- [Background](#background)
- [What ResQ Does](#what-resq-does)
- [Workflow](#workflow)
- [Components](#components)
- [Example](#example)
- [Multilingual Support](#multilingual-support)
- [Model Evaluation](#model-evaluation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Limitations and Responsible Use](#limitations-and-responsible-use)
- [Team](#team)
- [License](#license)

---

## Background

In a disaster, people reach out for help through SMS, web portals, and mobile apps. When hundreds of messages arrive at once, reading them one by one is slow, and the most urgent cases can sit unnoticed in the pile. Messages are also often short, incomplete, or written in a regional language the responder may not speak.

ResQ tackles this by turning free-text messages into structured, ranked information that a response team can act on faster.

## What ResQ Does

1. Collects emergency requests from digital channels (SMS, web, mobile).
2. Stores each request along with its processing details.
3. Cleans and tokenizes the text for model input.
4. Classifies urgency as **High**, **Medium**, or **Low** using a transformer model (BERT or RoBERTa, whichever performs better).
5. Extracts useful details such as location, disaster type, and resources needed.
6. Places requests in a priority queue shown in a responder interface.

ResQ is meant to support human decision-making, not replace it. A person always reviews and acts on the final request.

## Workflow

```text
Affected person
      |
      v
Request submission (SMS / Web / Mobile)
      |
      v
Collection and storage
      |
      v
Preprocessing and tokenization
      |
      v
BERT / RoBERTa
      |
      +--------------------+
      |                    |
      v                    v
Urgency prediction    Information extraction
      |               (location, disaster type,
      |                resources, medical needs,
      |                number of people)
      |                    |
      +----------+---------+
                 |
                 v
     Priority assignment (High / Medium / Low)
                 |
                 v
        Priority-based queue
                 |
                 v
          Responder view
                 |
                 v
       Human review and action
```

## Components

| Component | Responsibility |
|---|---|
| Request collection | Receive messages from supported channels |
| Data storage | Keep the original message and its processing results |
| Preprocessing | Clean and normalize text for analysis |
| Tokenization | Convert text into model-ready tokens |
| Urgency classification | Predict High, Medium, or Low using BERT and RoBERTa |
| Information extraction | Identify location, disaster type, required resources, medical needs, and number of people affected |
| Priority management | Order requests by predicted urgency |
| Responder interface | Show structured request details to response personnel |
| Language processing | Detect language and translate where needed |
| Evaluation | Compare models on accuracy, precision, recall, and F1-score |

## Example

*This is an illustration of the intended output, not a real model prediction.*

**Incoming message**

> Flood water has entered our house. Two people are injured and we need immediate medical help near the bridge.

**Structured result**

| Field | Value |
|---|---|
| Priority | High |
| Disaster type | Flood |
| Location | Near the bridge (needs confirmation) |
| Assistance needed | Rescue and medical help |
| Medical requirement | Two injured people |
| People affected | 2 |

Details like location would still need to be verified by a responder before action is taken.

## Multilingual Support

People often write for help in their own language. ResQ plans to explore language detection and translation so that regional-language requests can be understood by responders, and replies can be sent in the person's preferred language.

**Status:** Planned, not implemented.

## Model Evaluation

BERT and RoBERTa will be fine-tuned and compared on a labelled dataset of disaster-related emergency requests. The comparison will use:

- **Accuracy:** share of all predictions that are correct
- **Precision:** how often a predicted class is actually right
- **Recall:** how many of the true cases of a class are found
- **F1-score:** the balance between precision and recall

Training and evaluation have not started, so no results are reported. The final model will be chosen based on these metrics.

## Tech Stack

| Area | Choice | Status |
|---|---|---|
| Language | Python | Decided |
| Text processing | NLP preprocessing and information extraction | Proposed |
| Models | BERT, RoBERTa | To be evaluated |
| Classification | Three classes: High, Medium, Low | Proposed |
| Multilingual | Language detection and translation | Planned |
| Metrics | Accuracy, precision, recall, F1-score | Planned |

Libraries, web framework, database, dataset, and deployment setup are still to be decided and will be added here once confirmed.

## Project Structure

This is a suggested layout. It will be updated as the project takes shape.

```text
ResQ/
├── README.md
├── requirements.txt
├── docs/
│   ├── system-architecture.md
│   └── system-flow.md
├── data/
│   └── README.md
├── src/
│   ├── preprocessing/
│   ├── classification/
│   ├── information_extraction/
│   ├── prioritization/
│   └── language_processing/
└── tests/
```

Please do not commit private or sensitive emergency data to a public repository.

## Roadmap

- [ ] **Phase 1: Foundation** – confirm requirements and finalize the design
- [ ] **Phase 2: Dataset** – select the dataset and verify labels and preprocessing needs
- [ ] **Phase 3: Text processing** – build preprocessing and tokenization
- [ ] **Phase 4: Model experiments** – fine-tune and evaluate BERT and RoBERTa
- [ ] **Phase 5: Information extraction** – extract and structure key emergency details
- [ ] **Phase 6: Prioritization** – combine predictions and extracted details into a ranked queue
- [ ] **Phase 7: Responder interface** – build a view for reviewing prioritized requests
- [ ] **Phase 8: Integration and testing** – test the full workflow end to end
- [ ] **Phase 9: Documentation** – record implementation details, limitations, and results

**Possible future extensions:** voice requests, GPS-based location, image analysis, notifications, GIS maps, and offline processing.

## Limitations and Responsible Use

- ResQ is a decision-support tool for disaster response personnel.
- A predicted priority does not guarantee real severity and is no substitute for professional assessment.
- Emergency messages can be incomplete, unclear, or wrong, so details should always be verified.
- Results will depend on the quality of the dataset and labels, and on language variation.
- Until it is built and tested, ResQ should not be described as deployed, real-time, or operational.

## Team

B.Tech Computer Science and Engineering main project at **Vidya Academy of Science & Technology**, Thalakottukara, Thrissur, Kerala (academic year 2026–2027).

| Name | Student ID |
|---|---|
| Aavani K Shine | VAS23CS003 |
| Anagha Prakash | VAS23CS039 |
| Anjima PD | VAS23CS053 |
| Aravind G | VAS23CS060 |

**Project guide:** Dr Sunitha C
**Department:** Computer Science and Engineering

## License

No license has been chosen yet. Until a `LICENSE` file is added, please do not assume permission to reuse or redistribute this work.
