🚨 ResQ
AI-Assisted Disaster Relief Request Prioritization Using Natural Language Processing
Helping disaster response teams identify urgent needs from emergency messages.

ResQ is a proposed AI-assisted system for analysing disaster-related emergency requests, extracting key information, and organizing requests by urgency. It is designed to help response personnel review large volumes of unstructured messages more efficiently.
Project Information	Details
Project Status	🟡 Planning / Proposed Design
Domain	Natural Language Processing, Machine Learning, Disaster Management
Candidate Models	BERT and RoBERTa
License	Not yet specified


⚡ Overview
During disasters, affected people may submit requests through channels such as SMS, web portals, and mobile applications. When many messages arrive at once, manually reviewing each request can delay the identification of urgent situations. Messages may also contain incomplete details or be written in different languages.

ResQ proposes a workflow that applies Natural Language Processing (NLP) and transformer-based language models to help process these messages. The planned system will classify requests into High, Medium, and Low priority levels and extract information that can help responders understand the situation.
Project status: The project is currently in the planning stage. The architecture and capabilities described in this README are proposed and should not be interpreted as completed or deployed features.

🎯 Problem Statement
Disaster response teams may face challenges such as:
- Receiving a large volume of emergency requests in a short period.
- Manually screening unstructured text to identify urgent cases.
- Finding important details—such as location, type of disaster, and assistance required—within messages.
- Handling language differences between people requesting help and response personnel.
- Organizing requests so that potentially critical cases can be reviewed first.
ResQ aims to support this process by turning free-text emergency messages into structured, prioritized information.
💡 Proposed Solution
ResQ is planned as a modular NLP-based system that will:
1. Receive emergency requests submitted through supported digital channels.
2. Store incoming requests for processing.
3. Clean and preprocess message text, then tokenize it for model input.
4. Evaluate transformer-based models such as BERT and RoBERTa for urgency classification.
5. Extract useful details from each message.
6. Assign a priority category: High, Medium, or Low.
7. Organize prioritized requests for review through a proposed responder interface.
The system is intended to support—not replace—human judgement in disaster response.
🧠 How It Is Intended to Work
Affected Person
      |
      v
Emergency Request Submission
     (SMS / Web / Mobile)
      |
      v
Request Collection
      |
      v
Data Storage
      |
      v
Text Preprocessing & Tokenization
      |
      v
BERT / RoBERTa
(models to evaluate)
      |
      +-------------------------+
      |                         |
      v                         v
Urgency Prediction       Information Extraction
      |                         |
      |                  +----------------------+
      |                  | Location             |
      |                  | Disaster type        |
      |                  | Required resources   |
      |                  | Medical requirements |
      |                  | Affected people      |
      |                  +----------------------+
      |                         |
      +------------+------------+
                   |
                   v
          Priority Assignment
           High / Medium / Low
                   |
                   v
          Priority-Based Queue
                   |
                   v
          Proposed Responder View
                   |
                   v
            Human Review and Action
This diagram describes the proposed workflow, not a verified running implementation.
🧩 Planned Core Components
Component	Planned Responsibility
Emergency Request Collection	Receive requests from supported input channels.
Data Storage	Store the original request and associated processing details.
Text Preprocessing	Prepare message text for NLP analysis.
Tokenization	Convert processed text into model-compatible tokens.
Urgency Classification	Evaluate BERT and RoBERTa for High, Medium, and Low urgency classification.
Information Extraction	Identify location, disaster type, required resources, medical requirements, and affected-person details when available.
Priority Management	Organize requests by predicted urgency.
Responder Interface	Present structured request details to response personnel.
Language Processing	Explore language detection and translation to support multilingual requests and communication.
Evaluation	Compare candidate models using accuracy, precision, recall, and F1-score.


🔎 Example of the Intended Output
Illustrative example only — not an actual model prediction.

Incoming message:
“Flood water has entered our house. Two people are injured and we need immediate medical help near the bridge.”

A planned structured representation could look like this:
Field	Illustrative Value
Emergency Message	Original message submitted by the user
Priority	High (example only)
Location	Near the bridge (requires confirmation or more detail)
Disaster Type	Flood
Required Assistance	Rescue and medical assistance
Medical Requirement	Injured people need medical help
Affected Individuals	2 people mentioned


The final classification and extracted details would depend on model behaviour and available information. Emergency personnel would still need to verify details before taking action.
🌐 Multilingual Support
Language differences can make emergency communication harder. ResQ proposes exploring language detection and translation so requests written in regional languages can be understood by response personnel, and responses can potentially be communicated in a person's preferred language.

Status: Planned; multilingual support is not confirmed as implemented.
🧪 Model Evaluation
BERT and RoBERTa are candidate transformer models in the project report. Their performance is planned to be compared on a labelled disaster-related emergency request dataset.

The proposed evaluation metrics are:
- Accuracy: Overall proportion of correct predictions.
- Precision: How often requests assigned to a class are correct.
- Recall: How many relevant requests of a class are identified.
- F1-score: A combined measure of precision and recall.
No performance results are reported here because model training and evaluation have not yet been completed. Final model selection will depend on the evaluation results.
🛠️ Technology Direction
Area	Technology / Approach	Status
Programming	Python	Project direction provided
Natural Language Processing	NLP preprocessing and information extraction	Proposed
Transformer Models	BERT and RoBERTa	Candidates to evaluate
Urgency Classification	High, Medium, and Low classes	Proposed
Multilingual Processing	Language detection and translation	Planned
Model Evaluation	Accuracy, precision, recall, and F1-score	Planned


The exact libraries, web framework, database, dataset name, and deployment setup have not been specified in the information available for this README. They will be added when confirmed by the team.
🗂️ Proposed Project Structure
The final repository structure may change during implementation. The following is a suggested organization, not a description of existing files.
ResQ/
├── README.md
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
├── tests/
└── requirements.txt
Only add directories and files as they are created. Do not commit private, sensitive, or restricted emergency data to a public repository.
🚧 Development Roadmap
The roadmap below reflects the intended development sequence. It does not claim that these phases have been completed.
- [ ] Phase 1 — Foundation: Confirm requirements and finalize the system design.
- [ ] Phase 2 — Dataset Preparation: Verify the selected dataset, labels, and preprocessing needs.
- [ ] Phase 3 — Text Processing: Implement preprocessing and tokenization.
- [ ] Phase 4 — Model Experiments: Train or fine-tune and evaluate BERT and RoBERTa.
- [ ] Phase 5 — Information Extraction: Identify and structure relevant emergency details.
- [ ] Phase 6 — Prioritization: Combine urgency predictions with extracted details and organize requests by priority.
- [ ] Phase 7 — Responder Interface: Develop a way to review structured, prioritized requests.
- [ ] Phase 8 — Integration and Testing: Test the complete workflow and assess model performance.
- [ ] Phase 9 — Documentation: Record implementation details, limitations, and measured results.
⚠️ Scope and Responsible Use
- ResQ is intended as a decision-support tool for disaster response personnel.
- A predicted priority is not a guarantee of actual severity or a substitute for professional assessment.
- Emergency information may be incomplete, ambiguous, or inaccurate and should be verified.
- Model performance depends on dataset quality, label quality, language variation, and evaluation.
- The system should not be described as deployed, real-time, or operational until those capabilities have been implemented and tested.
- Future ideas such as voice-based requests, GPS-based location identification, image analysis, notifications, GIS visualization, and offline processing remain potential extensions unless implemented.
👥 Project Team
Developed as a B.Tech Computer Science and Engineering main project at Vidya Academy of Science & Technology, Thalakottukara, Thrissur, Kerala, during the 2026–2027 academic year.
Team Member	Student ID
Aavani K Shine	VAS23CS003
Anagha Prakash	VAS23CS039
Anjima PD	VAS23CS053
Aravind G	VAS23CS060


Project Guide: Dr Sunitha C
Department: Computer Science and Engineering
📄 License
No license has been specified for this repository yet. Until the team chooses a license and adds the corresponding LICENSE file, reuse and redistribution permissions should not be assumed.
⭐ Vision
ResQ aims to help transform unstructured emergency messages into information that is easier to review and prioritize—supporting more informed, organized disaster response while keeping human responders central to decision-making.
