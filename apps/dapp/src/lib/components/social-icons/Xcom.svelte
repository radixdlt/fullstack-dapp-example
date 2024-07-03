<svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" width="35" height="35" rx="17.5" fill="white" fill-opacity="0.3" />
  <path
    d="M20.2398 16.0323L27.375 7.9165H25.6842L19.4887 14.9633L14.5403 7.9165H8.83301L16.3159 18.5725L8.83301 27.0832H10.5239L17.0665 19.6415L22.2924 27.0832H27.9997L20.2394 16.0323H20.2398ZM17.9238 18.6664L17.1657 17.6053L11.1332 9.16203H13.7303L18.5986 15.976L19.3568 17.0371L25.685 25.8943H23.0878L17.9238 18.6668V18.6664Z"
  />
</svg>

<style lang="scss">
  svg {
    cursor: var(--cursor);
    path {
      fill: var(--fill, var(--color-dark));
    }
    &:hover {
      rect {
        fill-opacity: 0.6;
      }
      path {
        fill: var(--hover-fill);
      }
    }
  }
</style>
