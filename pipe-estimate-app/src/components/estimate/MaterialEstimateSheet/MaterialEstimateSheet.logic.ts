import { ref, computed } from "vue";
import type { EstimateItem } from "@/types/EstimateItem";

export function useMaterialEstimateSheet() {
  const sizes = ["15A", "20A", "25A"];
  const schedules = ["Sch40", "Sch80"];
  const diagramName = "図面Z001";

  const items = ref<EstimateItem[]>([
    {
      material: "鉄",
      shape: "直管",
      size: "15A",
      schedule: "Sch40",
      length: 6.0,
      unitLength: 6.0,
      unitPrice: 1200,
      quantity: 1,
      totalPrice: 7200,
    },
  ]);

  function update(index: number) {
    const item = items.value[index];
    item.quantity = Math.ceil(item.length / item.unitLength);
    item.totalPrice = Math.round(item.length * item.unitPrice);
  }

  function addItem() {
    items.value.push({
      material: "鉄",
      shape: "直管",
      size: sizes[0],
      schedule: schedules[0],
      length: 1.0,
      unitLength: 6.0,
      unitPrice: 1200,
      quantity: 1,
      totalPrice: 1200,
    });
    update(items.value.length - 1);
  }

  const totalAmount = computed(() =>
    items.value.reduce((sum, item) => sum + item.totalPrice, 0),
  );

  return { items, sizes, schedules, diagramName, addItem, update, totalAmount };
}
