// A sample of pi's UI in the current colors. Each element reads one role, as pi would.
export default function Preview({ colors: c }) {
  const card = "mb-3 whitespace-pre-wrap rounded px-3 py-2.5";
  const bar = "my-1 h-2.5 w-full rounded-sm";
  const label = "text-xs opacity-80";

  return (
    <section
      aria-label="preview"
      className="mx-6 mt-4 mb-6 overflow-auto rounded-lg border border-line p-5 font-mono text-[13px] leading-6"
      style={{ background: c.pageBg, color: c.text }}
    >
      <div className={card} style={{ background: c.userMessageBg, color: c.userMessageText }}>
        ❯ fix the login redirect
      </div>
      <div className={card} style={{ background: c.customMessageBg, color: c.customMessageText }}>
        <span style={{ color: c.customMessageLabel }}>[note]</span> custom message
      </div>
      <div className={card} style={{ background: c.toolSuccessBg }}>
        <span style={{ color: c.toolTitle }}>bash</span>{" "}
        <span style={{ color: c.success }}>✓ exit 0</span>
        {"\n"}
        <span style={{ color: c.toolOutput }}>Tests passed: 42</span>
        {"\n"}
        <span style={{ color: c.toolDiffAdded }}>+ added line</span>
        {"\n"}
        <span style={{ color: c.toolDiffContext }}> context line</span>
      </div>
      <div className={card} style={{ background: c.toolErrorBg }}>
        <span style={{ color: c.error }}>✗ exit 1</span>
        {"\n"}
        <span style={{ color: c.toolDiffRemoved }}>- removed line</span>
      </div>
      <div className={card} style={{ background: c.selectedBg, color: c.mdHeading }}>
        # Heading
      </div>
      <div className={card} style={{ background: c.cardBg, color: c.text }}>
        <span style={{ color: c.mdLink }}>docs</span>{" "}
        <span style={{ color: c.mdLinkUrl }}>https://example.com</span>
        {"\n"}
        <span style={{ color: c.mdCode }}>topic_key</span>{" "}
        <span style={{ color: c.mdQuote }}>| a quote</span>
        {"\n"}
        <span style={{ color: c.muted }}>muted text</span>{" "}
        <span style={{ color: c.dim }}>dim text</span>{" "}
        <span style={{ color: c.mdListBullet }}>•</span> item
        {"\n"}
        <span style={{ color: c.syntaxComment }}>// comment</span>
        {"\n"}
        <span style={{ color: c.syntaxKeyword }}>const</span>{" "}
        <span style={{ color: c.syntaxFunction }}>run</span>(
        <span style={{ color: c.syntaxNumber }}>42</span>,{" "}
        <span style={{ color: c.syntaxString }}>"ok"</span>);{" "}
        <span style={{ color: c.syntaxType }}>Result</span>{" "}
        <span style={{ color: c.syntaxVariable }}>err</span>{" "}
        <span style={{ color: c.syntaxOperator }}>=</span>{" "}
        <span style={{ color: c.syntaxPunctuation }}>;</span>
      </div>
      <div className={label}>thinking levels</div>
      <div className={bar} style={{ background: c.thinkingOff }} />
      <div className={bar} style={{ background: c.thinkingMinimal }} />
      <div className={bar} style={{ background: c.thinkingLow }} />
      <div className={bar} style={{ background: c.thinkingMedium }} />
      <div className={bar} style={{ background: c.thinkingHigh }} />
      <div className={bar} style={{ background: c.thinkingXhigh }} />
      <div className={bar} style={{ background: c.thinkingMax }} />
      <div className={label}>bash mode</div>
      <div className={bar} style={{ background: c.bashMode }} />
    </section>
  );
}
