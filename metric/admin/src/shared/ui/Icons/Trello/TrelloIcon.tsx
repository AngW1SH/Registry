import { FC, SVGAttributes } from "react";
import GenericIcon from "../Generic/GenericIcon";

interface TrelloIconProps extends SVGAttributes<SVGSVGElement> {}

const TrelloIcon: FC<TrelloIconProps> = (props) => {
  return (
    <GenericIcon viewBox="0 0 29 29" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5546 0H3.44653C2.53323 -7.60856e-07 1.65728 0.362771 1.01106 1.00864C0.36485 1.6545 0.00121892 2.53064 4.04745e-05 3.44462V25.5342C-0.00215428 25.9875 0.0849302 26.4367 0.256316 26.8562C0.427701 27.2757 0.680027 27.6573 0.998868 27.9792C1.31771 28.301 1.69681 28.5569 2.11451 28.732C2.53221 28.9072 2.9803 28.9982 3.43319 29H25.5574C26.0101 28.9995 26.4583 28.9097 26.8763 28.7359C27.2943 28.562 27.674 28.3074 27.9937 27.9866C28.3134 27.6659 28.5668 27.2852 28.7395 26.8665C28.9121 26.4477 29.0007 25.999 29 25.5459V3.44462C28.9988 2.53083 28.6353 1.65486 27.9894 1.00903C27.3434 0.363196 26.4677 0.000294009 25.5546 0V0ZM12.5074 20.888C12.5061 21.1938 12.3835 21.4865 12.1666 21.7018C11.9497 21.9171 11.6562 22.0374 11.3507 22.0362H6.51445C6.21107 22.0347 5.92061 21.9131 5.70655 21.698C5.4925 21.4828 5.37225 21.1916 5.37211 20.888V6.49927C5.37196 6.19557 5.49211 5.90419 5.70623 5.68897C5.92035 5.47375 6.21098 5.35224 6.51445 5.35106H11.3462C11.6501 5.35224 11.9413 5.47358 12.1562 5.68866C12.3711 5.90374 12.4924 6.19511 12.4936 6.49927L12.5074 20.888ZM23.6546 14.2814C23.6546 14.5859 23.5337 14.8781 23.3186 15.0935C23.1034 15.3089 22.8116 15.43 22.5073 15.4301H17.6622C17.3581 15.429 17.0669 15.3075 16.852 15.0923C16.637 14.8771 16.5158 14.5856 16.5148 14.2814V6.49927C16.516 6.19511 16.6373 5.90374 16.8522 5.68866C17.0671 5.47358 17.3582 5.35224 17.6622 5.35106H22.4934C22.7969 5.3521 23.0877 5.47354 23.302 5.68877C23.5162 5.90401 23.6364 6.19547 23.6363 6.49927L23.6546 14.2814Z"
        fill="url(#paint0_linear_1_535)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_535"
          x1="14.4986"
          y1="29"
          x2="14.4986"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
      </defs>
    </GenericIcon>
  );
};

export default TrelloIcon;
