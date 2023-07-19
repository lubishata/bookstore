import * as React from 'react';
import { translate } from '../../l10n';
import InnerHTML from '../../l10n/innerHTML';

const t = (str: string, context = "bg-localization") => translate(context, str);

const DummyText = () => (
    <div style={{
        marginTop: "200px",
        position: "relative",
        display: "block",
        textAlign: "center",
        padding: "0px 25%"
    }}>
        <InnerHTML str={t('loremIpsumDummyText')} />
    </div>
);


export default DummyText;
