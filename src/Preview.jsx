// A sample of pi's interactive screen. Each element reads the role pi uses for it (themes docs, components/tool-execution.ts).
const BLOCK = "mb-3 whitespace-pre-wrap rounded-[2px] px-3 py-2";
const THINKING = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];

// Background follows the tool state: pending while running, then success or error.
function Tool({ bg, children }) {
  return (
    <div className={BLOCK} style={{ background: bg }}>
      {children}
    </div>
  );
}

// The editor border shows the thinking level, or bash mode when the line starts with "!".
function Editor({ color, children }) {
  return (
    <div className="mb-3 rounded-[2px] border-2 px-3 py-2" style={{ borderColor: color }}>
      {children}
    </div>
  );
}

export default function Preview({ colors: c }) {
  return (
    <section
      aria-label="preview"
      className="preview-surface min-h-0 flex-1 overflow-auto p-5 font-mono text-[13px] leading-6"
      style={{ background: c.pageBg, color: c.text }}
    >
      <div className={BLOCK} style={{ background: c.userMessageBg, color: c.userMessageText }}>
        fix the login redirect
      </div>

      <div className="mb-3 whitespace-pre-wrap">
        <span style={{ color: c.mdHeading }}>Login redirect</span>
        {"\n"}
        Check <span style={{ color: c.mdCode }}>safeNext()</span> first, then the{" "}
        <span style={{ color: c.mdLink }}>OAuth docs</span>{" "}
        <span style={{ color: c.mdLinkUrl }}>https://example.com/oauth</span>.
      </div>

      <pre
        className="mb-3 border-l-2 pl-3 font-mono"
        style={{ borderColor: c.mdCodeBlockBorder, color: c.mdCodeBlock }}
      >
        <span style={{ color: c.syntaxKeyword }}>const</span>{" "}
        <span style={{ color: c.syntaxVariable }}>next</span>{" "}
        <span style={{ color: c.syntaxOperator }}>=</span>{" "}
        <span style={{ color: c.syntaxFunction }}>safeNext</span>
        <span style={{ color: c.syntaxPunctuation }}>(</span>
        <span style={{ color: c.syntaxString }}>"/home"</span>
        <span style={{ color: c.syntaxPunctuation }}>);</span>
        {"  "}
        <span style={{ color: c.syntaxComment }}>// fallback to the default</span>
      </pre>

      <Tool bg={c.toolSuccessBg}>
        <span className="font-bold" style={{ color: c.toolTitle }}>
          bash
        </span>{" "}
        <span style={{ color: c.text }}>$ npm test</span>
        {"\n"}
        <span style={{ color: c.toolOutput }}>Tests passed: 42</span>
        {"\n"}
        <span style={{ color: c.muted }}>Took 4.2s</span>
      </Tool>

      <Tool bg={c.toolSuccessBg}>
        <span className="font-bold" style={{ color: c.toolTitle }}>
          edit
        </span>{" "}
        <span style={{ color: c.accent }}>src/login.ts</span>
        {"\n"}
        <span style={{ color: c.toolDiffRemoved }}>- return redirect(next)</span>
        {"\n"}
        <span style={{ color: c.toolDiffAdded }}>+ return redirect(safeNext(next))</span>
        {"\n"}
        <span style={{ color: c.toolDiffContext }}> res.end()</span>
      </Tool>

      <Tool bg={c.toolErrorBg}>
        <span className="font-bold" style={{ color: c.toolTitle }}>
          bash
        </span>{" "}
        <span style={{ color: c.text }}>$ npm test</span>
        {"\n"}
        <span style={{ color: c.toolOutput }}>FAIL login.test.ts</span>
        {"\n"}
        <span style={{ color: c.error }}>Command exited with code 1</span>
      </Tool>

      <Tool bg={c.toolPendingBg}>
        <span className="font-bold" style={{ color: c.toolTitle }}>
          read
        </span>{" "}
        <span style={{ color: c.accent }}>src/session.ts</span>{" "}
        <span style={{ color: c.muted }}>Elapsed 1.2s</span>
      </Tool>

      <div className={BLOCK} style={{ background: c.customMessageBg, color: c.customMessageText }}>
        <span style={{ color: c.customMessageLabel }}>note</span> session saved
      </div>

      <div className="mb-3" style={{ color: c.text }}>
        <div className="px-3" style={{ background: c.selectedBg }}>
          dark
        </div>
        <div className="px-3" style={{ color: c.muted }}>
          light
        </div>
      </div>

      <Editor color={c.thinkingMedium}>
        <span style={{ color: c.dim }}>Message pi</span>
      </Editor>

      <Editor color={c.bashMode}>
        <span style={{ color: c.text }}>!ls -la</span>
      </Editor>

      <div className="flex flex-wrap gap-2 text-xs" style={{ color: c.dim }}>
        {THINKING.map((level) => (
          <span key={level} className="flex flex-col items-center gap-1">
            <span
              className="block h-3 w-8 rounded-[2px]"
              style={{ background: c[`thinking${level[0].toUpperCase()}${level.slice(1)}`] }}
            />
            {level}
          </span>
        ))}
      </div>
    </section>
  );
}
