const app = Vue.createApp({
  data() {
    return {
      randomCorgi: "https://source.unsplash.com/300x300/?corgi",
      isCorgiShown: false,
      isCorgiLoading: false,
    };
  },
  methods: {
    changeCorgi() {
      if (!this.isCorgiLoading) {
        this.isCorgiShown = !this.isCorgiShown;

        if (!this.isCorgiShown) {
          this.isCorgiLoading = true;
          console.log("changing...");

          fetch("https://source.unsplash.com/300x300/?corgi").then((res) => {
            console.log(res.url);
            this.randomCorgi = res.url;
            this.isCorgiLoading = false;
          });
        }
      }
    },
  },
  mounted() {
    console.log("App is mounted!");
  },
});

app.mount("#vue-mount");

// To unhide section after script is loaded
const section = document.querySelector("section");
section.hidden = false;
