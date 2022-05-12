<template>
  <div>
    <validation-observer ref="tokenList">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <ul class="tokenlist">
                <li @click="selectToken">0x4A2302dD0ddc706a6278292cb570000Ac15336AD</li>
                <hr style="margin: 0px;" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tokenList: []
    };
  },

  created() {
    this.$eventBus.$on("tokenSelected", (event) => {
    
    });
  },

  computed: {
  },
  
  methods: {
    selectToken: function(event) {
        console.log(event);
        this.$eventBus.$emit('selectToken', {selectToken: event.target.innerHTML});
        this.$eventBus.$emit('tokenModalClose');
    },
    initiate: function () {
     
    },
  },
  mounted() {
    this.initiate();
  },
};
</script>

<style>
.tokenlist {
  max-height: 400px;
  overflow: auto;
  padding: 0;
  margin-left: 20px;
  margin-right: 20px;
}

.tokenlist li {
  list-style: none;
  cursor: pointer;
  padding: 5px 10px;
  transition: 0.3s;
  border-radius: 3px;
}

.tokenlist li:hover {
  background-color: #222;
}
</style>
