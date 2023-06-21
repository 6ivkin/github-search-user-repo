const USER_PER_PAGE = 20;

export class Search {
  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  constructor(view) {
    this.view = view;

    this.view.searchInput.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500));
    this.view.loadMore.addEventListener('click', this.loadUsers.bind(this));
    this.currentPage = 1;
    this.usersCount = 0;
  }

  async loadUsers() {
    const searchValue = this.view.searchInput.value;
    let totalCount;
    let users;
    try {
      if (searchValue) {
        const response = await fetch(`https://api.github.com/search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${this.currentPage}`);
        if (response.ok) {
          this.currentPage++;
          const data = await response.json();
          users = data.items;
          totalCount = data.total_count;
          this.setUsersCount(this.usersCount + data.items.length);
          this.view.toggleLoadMoreBtn(totalCount > USER_PER_PAGE && this.usersCount !== totalCount);
          users.forEach(user => this.view.createUser(user));
        }
      } else {
        this.clearUsers();
      }
    } catch (error) {
      console.error(error);
    }
  }

  clearUsers() {
    this.view.usersList.innerHTML = '';
  }

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}