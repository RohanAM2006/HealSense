# backend/utils/status_calc.py
def calculate_status(current: float, target: float, goal_type: str) -> str:
    if goal_type == "increase":
        if current >= target:
            return "achieved"
        elif current >= 0.8 * target:
            return "in-progress"
        else:
            return "at-risk"
    elif goal_type == "decrease":
        if current <= target:
            return "achieved"
        elif current <= 1.2 * target:
            return "in-progress"
        else:
            return "at-risk"
    else:
        return "in-progress"
