methods: {
    logout() {
        // Clear the authentication token
        this.$store.dispatch('auth/clearToken'); // Adjust according to your store setup
        // Redirect to the login page
        this.$router.push('/user/login');
    },
    refreshCurrentPage() {
        // Navigate to the current route to refresh the page
        this.$router.push({ path: this.$route.path, query: this.$route.query });
    }
}