# utils/healthscore.py

def compute_health_score(summary: str) -> int:
    """
    Basic health score logic based on summary text.
    Add better AI/LLM logic later if needed.
    """
    score = 100
    summary = summary.lower()

    if "critical" in summary:
        score -= 50
    if "high risk" in summary:
        score -= 40
    if "elevated" in summary:
        score -= 30
    if "abnormal" in summary:
        score -= 20
    if "low" in summary:
        score -= 10
    if "normal" in summary:
        score += 10
    if "healthy" in summary:
        score += 20
    if "good" in summary:
        score += 10

    return max(0, min(score, 100))
