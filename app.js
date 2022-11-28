const app = Vue.createApp({
  data() {
    return {
      randomCorgi: "images/corgi.jpg",
      corgiURL: "https://api.unsplash.com/photos/random?query=corgi&count=30",
      isCorgiShown: false,
      isCorgiLoading: false,
      corgiList: [],
    };
  },
  methods: {
    generateRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setRandomCorgi() {
      setTimeout(() => {
        const randInt = this.generateRandomInteger(0, 29);
        this.randomCorgi = this.corgiList[randInt];
        this.isCorgiLoading = false;
        console.log({ randInt, image: this.randomCorgi });
      }, 1000);
    },
    changeCorgi() {
      //Prevent the user from flipping the Christmas tree when corgi is still loading
      if (!this.isCorgiLoading) {
        this.isCorgiShown = !this.isCorgiShown;

        //Load the corgi BEHIND the Christmas tree
        if (!this.isCorgiShown) {
          this.isCorgiLoading = true;
          console.log("changing...");

          //Fetch from the API ONLY if the array is empty
          //ELSE just take from the array
          if (this.corgiList.length === 0) {
            console.log("fetching...");
            this.fetchCorgiList();
          } else {
            this.setRandomCorgi();
          }
        }
      }
    },
    fetchCorgiList() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      fetch(this.corgiURL, {
        signal: controller.signal,
        headers: {
          Authorization:
            "Client-ID 9ZOedTljfoArOknCQ-E2fFpVh51vpSyziyp8gHqrVZg",
        },
      })
        .then((res) => {
          const rateLimitRemaining = res.headers.get("X-Ratelimit-Remaining");
          console.log({ rateLimitRemaining });
          clearTimeout(timeoutId);
          return res.json();
        })
        .then((json) => {
          console.log(json);
          //AVAILABLE SIZES: full, raw, regular, small, small_s3, thumb
          console.log(json[0].urls.small);
          console.dir(json.map((item) => item.urls.small));

          this.corgiList = json.map((item) => item.urls.small);
          this.setRandomCorgi();
        })
        .catch((error) => {
          console.log({ error });
          console.log("FETCH REQUEST ABORTED");
          this.isCorgiLoading = false;
        });
    },
  },
  mounted() {
    console.log("App is mounted!");
  },
});

app.mount("#vue-mount");
