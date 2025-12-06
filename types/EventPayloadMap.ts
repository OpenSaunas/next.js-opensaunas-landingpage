export interface EventPayloadMap {
  click_cta_join: {
    timestamp: string;
    referrer: string;
    user_agent: string;
    traffic_source: string;
  };
  submit_form_join: {
    email_domain: string;
    is_valid: boolean;
    success: boolean;
    timeStamp: string;
  };
  valid_contact: {
    email_domain: string;
    is_valid: boolean;
    timeStamp: string;
  };
  page_view: {
    path: string;
    referrer: string;
    traffic_source: string;
    timestamp: string;
  };
  input_start: {
    timestamp: string;
  };
  checkbox_click: {
    is_checked: boolean;
    timestamp: string;
  };
}
