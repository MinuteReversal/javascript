/**
 * js 文件必须是单独文章 script 加 defer 属性
 *
 */
class LeftRightPannel extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.style =
      "display:flex;justify-content:space-between; width:300px;height:300px;border:1px dotted orange;";
    wrapper.innerHTML = `<slot name="left"></slot><slot name="right"></slot>`;

    shadow.appendChild(wrapper);
  }
}
customElements.define("left-right-pannel", LeftRightPannel);
