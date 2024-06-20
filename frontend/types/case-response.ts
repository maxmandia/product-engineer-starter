export interface CaseResponse {
    case_id: string;
    status: string;
    procedure_name: string;
    cpt_codes: string[];
    summary: string;
    is_met: boolean;
    is_complete: boolean;
    steps: Step[];
}

interface Step {
    key: string;
    question: string;
    options: Option[];
    reasoning: string;
    decision: string;
    next_step: string;
    is_met: boolean;
    is_final: boolean;
    evidence: Evidence[];
    logic?: Logic[];
}

interface Option {
    key: string;
    text: string;
    selected: boolean;
}

interface Evidence {
    content: string;
    page_number: number;
    pdf_name: string;
    event_datetime: string | null;
}

interface Logic {
    text: string;
    selected: boolean;
}
