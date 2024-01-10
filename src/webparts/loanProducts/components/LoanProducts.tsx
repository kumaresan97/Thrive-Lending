import * as React from "react";
import styles from "./LoanProducts.module.scss";
import { ILoanProductsProps } from "./ILoanProductsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import MainComponent from "./MainComponent";

export default class LoanProducts extends React.Component<
  ILoanProductsProps,
  {}
> {
  constructor(prop: ILoanProductsProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ILoanProductsProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <MainComponent sp={sp} context={this.props.context} />;
  }
}
