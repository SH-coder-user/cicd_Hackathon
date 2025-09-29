export const DUMMY_RECIPE = {
  menuName: "장어구이",
  estimatedCost: 18000,
  price: 26000,
  margin: null,
  tips: "간장·미림·설탕 베이스 소스를 한 번에 만들어 바르고, 남은 소스는 냉장 보관해 재사용하면 원가 절감에 좋아요.",
  ingredients: ["장어", "간장", "설탕", "미림", "다진마늘", "생강", "물엿"],
};
function toNumOr(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * 원시 item을 안전하게 정제해서 반환.
 * 문제가 있으면 console.warn만 찍고 DUMMY_RECIPE로 대체/병합.
 */
export function makeSafeRecipe(raw) {
  if (!raw || typeof raw !== "object") {
    console.warn("[Recipe] invalid or empty item, fallback to DUMMY_RECIPE:", raw);
    return { ...DUMMY_RECIPE };
  }

  const merged = { ...DUMMY_RECIPE, ...raw };

  // 이름 정규화
  merged.menuName = merged.menuName || merged.name || DUMMY_RECIPE.menuName;

  // 숫자 필드 정규화
  merged.estimatedCost = toNumOr(merged.estimatedCost, DUMMY_RECIPE.estimatedCost);
  merged.price = toNumOr(merged.price, DUMMY_RECIPE.price);

  // margin이 숫자가 아니면 null로 두어서 컴포넌트 계산 로직을 사용
  merged.margin =
    merged.margin == null || !Number.isFinite(Number(merged.margin))
      ? null
      : Number(merged.margin);

  // 배열 필드 정규화
  if (!Array.isArray(merged.ingredients) || merged.ingredients.length === 0) {
    console.warn("[Recipe] ingredients missing, using dummy ingredients.");
    merged.ingredients = [...DUMMY_RECIPE.ingredients];
  }

  // 텍스트 필드
  if (!merged.tips) {
    console.warn("[Recipe] tips missing, using dummy tips.");
    merged.tips = DUMMY_RECIPE.tips;
  }

  return merged;
}
