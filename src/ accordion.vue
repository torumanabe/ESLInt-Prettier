<template>
  <div class="accordion-area">
    <div id="accordion">
      <div id="accordionCamera">
        <h3>
          <a href="#" />
        </h3>
        <div />
      </div>
      <div id="accordionCustomview">
        <h3>
          <a href="#" />
        </h3>
        <div />
      </div>
      <div id="accordionMap">
        <h3>
          <a href="#" />
        </h3>
        <div />
      </div>
      <div id="accordionOther">
        <h3>
          <a href="#" />
        </h3>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import AccordionUI from "../../js/customLibs/ui/accordionUI.js";
import EditMapItem from "/js/customLibs/editMapItem.js";

export default {
    name: 'ItemAccordion',
    mounted () {
        let editMapItem = new EditMapItem("c8d72e9d304928e34b73120f35cba6a2");
        editMapItem.Init();
        const accordionDiv = document.getElementById("accordion");
        let accordion = new AccordionUI(accordionDiv);
        accordion.Init(editMapItem);
    }
}

</script>