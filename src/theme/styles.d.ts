// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    brand: {
      primary: {
        text: string;
        background: string;
      };
      secondary: {
        text: string;
        background: string;
      };
      accent: {
        text: string;
        background: string;
      };
    };
    color: {
      gray90: string;
      blueGray: string;
    };
  }
}
