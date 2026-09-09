import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import SustainableDestinationView from "./SustainableDestinationView.vue";

describe("SustainableDestinationView", () => {
  afterEach(() => localStorage.clear());

  it("registra material e atualiza os indicadores", async () => {
    const wrapper = mount(SustainableDestinationView);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Cascas de legumes");
    await inputs[1].setValue("12,5");
    await wrapper.get("form").trigger("submit");

    expect(wrapper.text()).toContain("Destino registrado com sucesso.");
    expect(wrapper.text()).toContain("12,5 kg");
    expect(wrapper.text()).toContain("Cascas de legumes");
    expect(
      JSON.parse(
        localStorage.getItem("apoio:sustainable-destinations") ?? "[]",
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          material: "Cascas de legumes",
          weight: 12.5,
          destination: "compostagem",
          date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
        }),
      ]),
    );
  });

  it("não registra um destino sem material e peso válidos", async () => {
    const wrapper = mount(SustainableDestinationView);

    await wrapper.get("form").trigger("submit");

    expect(wrapper.text()).toContain(
      "Informe o material e um peso maior que zero.",
    );
    expect(localStorage.getItem("apoio:sustainable-destinations")).toBeNull();
  });
});
