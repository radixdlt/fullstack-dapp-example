<svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_4648_46708)">
    <path
      d="M15.1125 34.825C6.8 33.3375 0.5 26.1625 0.5 17.5C0.5 7.875 8.375 0 18 0C27.625 0 35.5 7.875 35.5 17.5C35.5 26.1625 29.2 33.3375 20.8875 34.825L19.925 34.0375H16.075L15.1125 34.825Z"
      fill="white"
      fill-opacity="0.3"
    />
    <path
      d="M24.8252 22.4002L25.6127 17.5002H20.9752V14.0877C20.9752 12.6877 21.5002 11.6377 23.6002 11.6377H25.8752V7.17519C24.6502 7.00019 23.2502 6.8252 22.0252 6.8252C18.0002 6.8252 15.2002 9.2752 15.2002 13.6502V17.5002H10.8252V22.4002H15.2002V34.7377C16.1627 34.9127 17.1252 35.0002 18.0877 35.0002C19.0502 35.0002 20.0127 34.9127 20.9752 34.7377V22.4002H24.8252Z"
    />
  </g>
  <defs>
    <clipPath id="clip0_4648_46708">
      <rect width="35" height="35" fill="white" transform="translate(0.5)" />
    </clipPath>
  </defs>
</svg>

<style lang="scss">
  svg {
    cursor: var(--cursor);

    path:nth-child(2) {
      fill: var(--fill, var(--color-dark));
    }
    &:hover {
      path:nth-child(1) {
        fill-opacity: 0.6;
      }
      path:nth-child(2) {
        fill: var(--hover-fill);
      }
    }
  }
</style>
