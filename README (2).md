<div align="center">

# ResQ

### *AI-Assisted Disaster Relief Request Prioritization Using NLP*


![Status](https://img.shields.io/badge/Status-Planning%20%2F%20Design-orange)
![Language](https://img.shields.io/badge/Language-Python-blue)
![Domain](https://img.shields.io/badge/Domain-NLP%20%7C%20Machine%20Learning-purple)
![Models](https://img.shields.io/badge/Candidate%20Models-BERT%20%7C%20RoBERTa-teal)
![License](https://img.shields.io/badge/License-Not%20Selected-lightgrey)

**Turning emergency messages into structured, prioritized information for disaster response teams.**

</div>

---

> **Project status:** ResQ is currently in the planning and design stage. The proposed system has not yet been built, deployed, or tested.

## What is ResQ?

ResQ is a proposed AI-assisted system that aims to help disaster response teams identify emergency requests that may need urgent attention. It will use Natural Language Processing (NLP) to classify requests by urgency and extract useful details, helping responders review critical cases first.

## Background

During disasters, requests for help may arrive through SMS, websites, and mobile applications. When many messages arrive at once, reviewing them manually can delay the identification of urgent cases. Messages may also be incomplete, unclear, or written in regional languages.

ResQ aims to turn unstructured messages into organized information that response teams can review more efficiently.

## Key Features

- **Urgency Classification:** Classify requests as High, Medium, or Low priority.
- **Information Extraction:** Identify location, disaster type, medical needs, and required resources.
- **Priority Queue:** Organize requests by predicted urgency.
- **Responder Review:** Allow response personnel to verify information and make decisions.
- **Multilingual Support:** Explore language detection and translation as a possible future feature.

## Workflow

```text
Emergency Request
       |
       v
Collection and Storage
       |
       v
Text Preprocessing
       |
       v
BERT / RoBERTa
       |
       +------------------------+
       |                        |
       v                        v
Urgency Classification    Information Extraction
(High / Medium / Low)     (Location, needs, resources)
       |                        |
       +------------+-----------+
                    |
                    v
          Priority-Based Queue
                    |
                    v
             Responder Review
                    |
                    v
              Human Decision
```

## Main Components

| Component | Responsibility |
|---|---|
| Request Collection | Receive emergency messages from supported channels |
| Data Storage | Store requests and processing details |
| Text Preprocessing | Clean and prepare messages for analysis |
| Urgency Classification | Predict High, Medium, or Low priority |
| Information Extraction | Identify location, disaster type, medical needs, and resources |
| Priority Management | Organize requests by predicted urgency |
| Responder Interface | Present structured requests for review |
| Model Evaluation | Compare candidate models using defined metrics |

## Example

*Illustration of the intended output only — not a real model prediction.*

**Incoming message**

> Flood water has entered our house. Two people are injured and we need immediate medical help near the bridge.

**Possible structured result**

| Field | Example Value |
|---|---|
| Priority | High (illustrative only) |
| Disaster Type | Flood |
| Location | Near the bridge — needs confirmation |
| Assistance Needed | Rescue and medical help |
| Medical Requirement | Two injured people |
| People Affected | 2 |

A responder must verify the details before taking action.

## Model Evaluation

BERT and RoBERTa are candidate models that will be evaluated using a labelled dataset of disaster-related emergency requests.

Planned evaluation metrics:

- **Accuracy:** Overall proportion of correct predictions.
- **Precision:** How often predictions for a class are correct.
- **Recall:** How many actual cases of a class are identified.
- **F1-score:** A combined measure of precision and recall.

Particular attention will be given to recall for high-priority requests because missing an urgent case may have serious consequences.

Training and evaluation have not started, so no model performance results are reported.

## Proposed Technology Stack

| Area | Choice | Status |
|---|---|---|
| Programming Language | Python | Selected |
| Text Processing | Natural Language Processing | Proposed |
| Candidate Models | BERT and RoBERTa | To be evaluated |
| Classification | High, Medium, Low | Proposed |
| Information Extraction | Named Entity Recognition and related NLP methods | Proposed |
| Evaluation | Accuracy, precision, recall, F1-score | Planned |
| Multilingual Support | Language detection and translation | Planned possibility |

The dataset, libraries, web framework, database, and deployment approach will be documented once confirmed.

## Project Structure

The following is a suggested structure and may change during development.

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

## Roadmap

- [ ] **Phase 1:** Confirm requirements and finalize the design
- [ ] **Phase 2:** Select a dataset and verify labels
- [ ] **Phase 3:** Implement preprocessing and tokenization
- [ ] **Phase 4:** Fine-tune and evaluate BERT and RoBERTa
- [ ] **Phase 5:** Extract and structure emergency details
- [ ] **Phase 6:** Build priority assignment and queue logic
- [ ] **Phase 7:** Develop a responder-facing interface
- [ ] **Phase 8:** Integrate and test the workflow
- [ ] **Phase 9:** Document implementation, limitations, and results

Possible future extensions include voice requests, GPS-based location, image analysis, notifications, GIS maps, and offline processing.

## Limitations and Responsible Use

- ResQ is intended to support response personnel, not replace human judgement.
- Predicted priority does not guarantee the actual severity of a situation.
- Emergency details may be incomplete or incorrect and must be verified.
- Performance will depend on dataset quality, labelling, and language variation.
- Until development and testing are completed, ResQ should not be described as deployed, real-time, or operational.
- Private or sensitive emergency data must not be committed to a public repository.

## Team

**B.Tech Computer Science and Engineering Main Project**  
Vidya Academy of Science & Technology  
Thalakottukara, Thrissur, Kerala, India  
Academic Year: 2026–2027

| Name | Student ID |
|---|---|
| Aavani K Shine | VAS23CS003 |
| Anagha Prakash | VAS23CS039 |
| Anjima PD | VAS23CS053 |
| Aravind G | VAS23CS060 |

**Project Guide:** Dr Sunitha C  
**Department:** Computer Science and Engineering

## License

No license has been selected yet. Until a `LICENSE` file is added, do not assume permission to reuse or redistribute this work.

---

<div align="center">

*ResQ — Supporting clearer, more organized disaster relief assessment.*

</div>
