/**
 * js 文件必须是单独文章 script 加 defer 属性
 *
 */
class MyInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("change", evt => {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: input.value
        })
      );
    });

    if (this.hasAttribute("value")) {
      input.value = this.getAttribute("value");
    }

    shadow.appendChild(input);
  }
}
customElements.define("my-input", MyInput);
