const SAMPLE_DATA = {
  "bills": [
    {
      "number": "SB 123",
      "name": "Official bill name",
      "customName": "Custom bill name",
      "session": "2023-2024 Regular Session",
      "latest_activity": "March 28 set for first hearing",
      "upcoming_activity": "Hearing set for July 25",
      "issue_area": "Housing",
      "committee": "Sen Judiciary",
      "dashboard": ""
    },
    {
      "number": "SB 456",
      "name": "Official bill name",
      "customName": "Custom bill name",
      "session": "2023-2024 Regular Session",
      "latest_activity": "March 28 set for first hearing",
      "upcoming_activity": "Hearing set for July 25",
      "issue_area": "Housing",
      "committee": "Sen Judiciary",
      "dashboard": "TEC 2023-2024"
    },
    {
      "number": "SB 789",
      "name": "Official bill name",
      "customName": "Custom bill name",
      "session": "2023-2024 Regular Session",
      "latest_activity": "March 28 set for first hearing",
      "upcoming_activity": "Hearing set for July 25",
      "issue_area": "Housing",
      "committee": "Sen Judiciary",
      "dashboard": ""
    }
  ]
}

export function getBills(filters: any, sort: any) {
  return SAMPLE_DATA;
}