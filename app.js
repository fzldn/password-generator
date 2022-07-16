document.addEventListener("alpine:init", () => {
  Alpine.data("passwordGenerator", () => ({
    length: 16,
    numeric: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbol: "~!@#$%^&*_+-=:;?,.",
    types: {
      numeric: true,
      lowercase: true,
      uppercase: true,
      symbol: true,
    },
    password: "",

    init() {
      this.generatePassword();

      this.$watch("length", () => {
        this.generatePassword();
      });
      this.$watch("types", () => {
        this.generatePassword();
      });
    },

    get chars() {
      return Object.keys(this.types).reduce((prev, curr) => {
        if (this.types[curr]) {
          return [...prev, curr];
        }

        return [...prev];
      }, []);
    },

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getRandomElement(elements) {
      return elements[this.getRandomInt(elements.length)];
    },
    generatePassword() {
      if (this.chars.length) {
        this.password = "";
        let char = null;
        for (let i = 0; i < this.length; i++) {
          char = this.getRandomElement(this.chars);
          this.password = this.password + this.getRandomElement(this[char]);
        }
      }
    },
    async copyPassword() {
      await navigator.clipboard.writeText(this.password);

      window.getSelection().selectAllChildren(this.$refs.password);

      const animation = "animate__heartBeat";
      this.$refs.copyPassword.innerText = "Copied!";
      this.$refs.copyPassword.classList.add(animation);
      this.$refs.copyPassword.classList.remove("focus:ring-2");

      setTimeout(() => {
        this.$refs.copyPassword.innerText = "Copy Password";
        this.$refs.copyPassword.classList.remove(animation);
        this.$refs.copyPassword.classList.add("focus:ring-2");
      }, 1000);
    },
  }));
});
