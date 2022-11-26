const app = Vue.createApp({
  data() {
    return {
      randomCorgi: "/corgi.jpg",
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
          this.fetchCorgi();
        }
      }
    },
    fetchCorgi() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      fetch("https://source.unsplash.com/300x300/?corgi", {
        signal: controller.signal,
      })
        .then((res) => {
          console.log(res.url);
          this.randomCorgi = res.url;
          clearTimeout(timeoutId);
        })
        .catch((error) => {
          console.log(error);
          console.log("FETCH REQUEST ABORTED");
        })
        .finally(() => {
          this.isCorgiLoading = false;
        });
    },
  },
  mounted() {
    console.log("App is mounted!");
  },
});

app.mount("#vue-mount");
