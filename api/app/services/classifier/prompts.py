from app.db.pg.models.alerts import ObligationAlertType
from app.db.pg.models.sources import ContentType

CLASSIFICATION_PROMPT = """You are a senior risk and compliance analyst. Given the document below,
you need to decide whether this document contains clearly stated and enforceable regulatory
obligations, rules or requirements for a company.

Document contains regulatory obligations only if you as a compliance analyst can create a clear
set of obligations or rules a company needs to follow.

Return exactly JSON structure: {{is_regulatory:boolean, confidence:0.0-1.0, categories:list}}

Regulatory categories must be chosen from: {categories}.

If the document merely announces future rules or obligations - it's not regulatory.

Confidence is a subjective probability that such obligations or rules are present in the
document. If confidence is higher than 0.5, it's regulatory.

Your task is to return ONLY the JSON, no other text."""


OBLIGATION_ALERT_EXTRACTION_PROMPT = """You are a compliance analyst. Extract regulatory obligations
from the document below.

Look for requirements, prohibitions, mandatory actions, reporting duties, and compliance rules.
Even general requirements should be included.

### CATEGORIES ###
{categories}

### FIELD DEFINITIONS ###
- obligation_type: Type of obligation. Use one of these standard types when possible:
{obligation_alerts_types}
- title: Title of the obligation
- description: Clear, concise summary/description of what organizations must do
- category: Primary regulatory category (use one of these categories)
- sub_category: Secondary/sub-category if applicable (optional, use one of these categories or null if not specified)
- risk_level: Risk level - MUST be exactly "high", "medium", "low", or "unknown" (case-sensitive)
- effective_date: When the obligation becomes effective (ISO format or descriptive text; use null if not specified)
- deadline_date: Compliance deadline or due date (ISO format or descriptive text; use null if not specified)
- business_impact: Business impact of the obligation (optional, use null if not specified)
- action_required: Action required to comply with the obligation (optional, use null if not specified)
- requirements: Specific requirements of the obligation (optional, use null if not specified)
- penalties: Description of penalties for non-compliance (optional, use null if not specified)
- confidence: Your confidence in this extraction (0.0-1.0, minimum 0.5)

### INSTRUCTIONS ###
- Find any text that tells organizations what they MUST do, CANNOT do, or SHOULD report
- Include even high-level requirements
- Extract dates in ISO format when possible, otherwise use descriptive text
- IMPORTANT: Use null (not empty strings) for effective_date and deadline_date when dates are not mentioned or unclear
- Set confidence >= 0.5 for any reasonable interpretation
- For risk_category: assess based on penalties, urgency, or regulatory emphasis
- Return only valid JSON

Extract regulatory obligations from this document. Find any requirements, rules, or compliance
duties.

Return JSON with this exact structure:
{{"no_obligations_found": false, "obligations": [{{
    "obligation_type": "compliance_requirement",
    "title": "Capital Adequacy",
    "description": "Maintain minimum 8% capital ratio",
    "category": "prudential_risk",
    "sub_category": "conduct_customer_protection",
    "risk_level": "high",
    "effective_date": "2025-01-01",
    "deadline_date": null,
    "penalties": null,
    "requirements": "Financial institutions must maintain a minimum capital ratio of 8%",
    "business_impact": "May require additional capital raising",
    "action_required": "Review and adjust capital ratios monthly",
    "confidence": 0.9
}}]}}

If no obligations exist, return:
{{"no_obligations_found": true, "obligations": []}}"""


def get_classification_prompt(content_types: list[ContentType | str] | None = None) -> str:
    """Get classification prompt.
    Args:
        content_types: List of content types (None for all content types)

    Returns:
        Formatted classification prompt
    """
    if content_types is None:
        content_type_data = ContentType.get_content_type_data().values()
    else:
        content_type_data = [ContentType.get_content_type_data_by_id(content_type) for content_type in content_types]

    content_type_data_str = "\n".join(
        f"- {content_type.id} - {content_type.description}" for content_type in content_type_data
    )
    return CLASSIFICATION_PROMPT.format(categories=content_type_data_str)


def get_obligation_alert_extraction_prompt(
    content_types: list[ContentType | str] | None = None,
    obligation_alerts_types: list[ObligationAlertType | str] | None = None,
) -> str:
    """Get obligation alert extraction prompt.
    Args:
        content_types: List of content types (None for all content types)
        obligation_alerts_types: List of obligation alert types (None for all obligation alert types)

    Returns:
        Formatted obligation alert extraction prompt
    """
    if content_types is None:
        content_type_data = ContentType.get_content_type_data().values()
    else:
        content_type_data = [ContentType.get_content_type_data_by_id(content_type) for content_type in content_types]

    content_type_data_str = "\n".join(
        f"- {content_type.id} - {content_type.description}" for content_type in content_type_data
    )

    if obligation_alerts_types is None:
        obligation_alert_type_data = ObligationAlertType.get_obligation_alert_type_data().values()
    else:
        obligation_alert_type_data = [
            ObligationAlertType.get_obligation_alert_type_data_by_id(obligation_alert_type)
            for obligation_alert_type in obligation_alerts_types
        ]

    obligation_alert_type_data_str = "\n".join(
        f"- {obligation_alert_type.id} - {obligation_alert_type.description}"
        for obligation_alert_type in obligation_alert_type_data
    )

    return OBLIGATION_ALERT_EXTRACTION_PROMPT.format(
        categories=content_type_data_str, obligation_alerts_types=obligation_alert_type_data_str
    )
