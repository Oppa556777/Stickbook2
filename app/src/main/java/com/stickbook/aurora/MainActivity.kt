package com.stickbook.aurora

import android.annotation.SuppressLint
import android.app.*
import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.view.*
import android.view.inputmethod.EditorInfo
import android.webkit.*
import android.widget.*
import java.net.URLEncoder
import java.util.Locale

/** A lightweight, privacy-first Android WebView browser with an original bottom-dock UI. */
class MainActivity : Activity() {
    private val tabs = mutableListOf<BrowserTab>()
    private lateinit var webContainer: FrameLayout
    private lateinit var address: EditText
    private lateinit var progress: ProgressBar
    private lateinit var tabCount: TextView
    private lateinit var pageTitle: TextView
    private var active = 0
    private var privateMode = false

    private val ink = Color.rgb(16, 19, 26)
    private val panel = Color.rgb(28, 33, 43)
    private val mint = Color.rgb(185, 246, 213)
    private val mist = Color.rgb(210, 218, 231)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = ink
        window.navigationBarColor = ink
        buildUi()
        addTab()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun buildUi() {
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setBackgroundColor(ink) }
        root.addView(topBar(), LinearLayout.LayoutParams(-1, dp(74)))
        progress = ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal).apply {
            max = 100; progressDrawable.setTint(mint); visibility = View.INVISIBLE
        }
        root.addView(progress, LinearLayout.LayoutParams(-1, dp(2)))
        webContainer = FrameLayout(this).apply { setBackgroundColor(Color.WHITE) }
        root.addView(webContainer, LinearLayout.LayoutParams(-1, 0, 1f))
        root.addView(bottomDock(), LinearLayout.LayoutParams(-1, dp(78)))
        setContentView(root)
    }

    private fun topBar(): View {
        return LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(16), dp(8), dp(16), dp(6))
            setBackgroundColor(ink)
            val row = LinearLayout(context).apply { gravity = Gravity.CENTER_VERTICAL }
            val brand = TextView(context).apply {
                text = "A"; textSize = 20f; gravity = Gravity.CENTER; setTextColor(ink); typeface = android.graphics.Typeface.DEFAULT_BOLD
                background = pill(mint, 18)
            }
            row.addView(brand, LinearLayout.LayoutParams(dp(36), dp(36)))
            address = EditText(context).apply {
                hint = getString(com.stickbook.aurora.R.string.search_hint); hintTextColor = Color.rgb(151, 162, 178)
                setTextColor(mist); textSize = 14f; singleLine = true; background = pill(panel, 24)
                setPadding(dp(17), 0, dp(12), 0); imeOptions = EditorInfo.IME_ACTION_GO
                setOnEditorActionListener { _, _, _ -> navigate(address.text.toString()); true }
                setOnFocusChangeListener { _, focused -> if (focused) selectAll() }
            }
            row.addView(address, LinearLayout.LayoutParams(0, dp(46), 1f).apply { marginStart = dp(10) })
            val menu = textButton("⋮", 24f) { showMenu() }
            row.addView(menu, LinearLayout.LayoutParams(dp(42), dp(46)))
            addView(row, LinearLayout.LayoutParams(-1, dp(50)))
            pageTitle = TextView(context).apply { text = "  AURORA  •  PRIVATE BY DEFAULT"; textSize = 10f; letterSpacing = .12f; setTextColor(Color.rgb(128, 145, 162)); isSingleLine = true }
            addView(pageTitle, LinearLayout.LayoutParams(-1, dp(18)))
        }
    }

    private fun bottomDock(): View {
        return LinearLayout(this).apply {
            gravity = Gravity.CENTER; setPadding(dp(10), dp(12), dp(10), dp(16)); setBackgroundColor(ink)
            addView(textButton("‹", 36f) { current().web.goBack() }, LinearLayout.LayoutParams(0, -1, 1f))
            addView(textButton("›", 36f) { current().web.goForward() }, LinearLayout.LayoutParams(0, -1, 1f))
            addView(textButton("⌂", 25f) { current().web.loadDataWithBaseURL(null, home(), "text/html", "UTF-8", null) }, LinearLayout.LayoutParams(0, -1, 1f))
            tabCount = TextView(this).apply {
                text = "1"; gravity = Gravity.CENTER; textSize = 14f; setTextColor(mint); background = outlinedPill()
                setOnClickListener { showTabs() }
            }
            addView(tabCount, LinearLayout.LayoutParams(dp(48), dp(42)).apply { marginStart = dp(4); marginEnd = dp(4) })
            addView(textButton("＋", 27f) { addTab() }, LinearLayout.LayoutParams(0, -1, 1f))
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun addTab(url: String? = null) {
        val web = WebView(this)
        web.setBackgroundColor(Color.WHITE)
        web.settings.apply {
            javaScriptEnabled = true; domStorageEnabled = true; databaseEnabled = false
            setSupportZoom(true); builtInZoomControls = false; displayZoomControls = false
            mediaPlaybackRequiresUserGesture = true; userAgentString += " Aurora/1.0"
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        }
        web.settings.safeBrowsingEnabled = true
        web.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val scheme = request.url.scheme ?: return true
                return if (scheme == "http" || scheme == "https") false else { try { startActivity(android.content.Intent(android.content.Intent.ACTION_VIEW, request.url)) } catch (_: Exception) {}; true }
            }
            override fun onPageFinished(view: WebView, url: String) { if (activeTab().web == view) updateChrome() }
        }
        web.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView, value: Int) { if (activeTab().web == view) { progress.progress = value; progress.visibility = if (value >= 100) View.INVISIBLE else View.VISIBLE } }
            override fun onReceivedTitle(view: WebView, title: String?) { tabs.find { it.web == view }?.title = title ?: "Untitled"; if (activeTab().web == view) updateChrome() }
        }
        tabs.add(BrowserTab(web, "New tab")); active = tabs.lastIndex; webContainer.addView(web, FrameLayout.LayoutParams(-1, -1))
        showOnlyActive()
        if (url == null) web.loadDataWithBaseURL(null, home(), "text/html", "UTF-8", null) else web.loadUrl(url)
    }

    private fun navigate(raw: String) {
        var target = raw.trim()
        if (target.isEmpty()) return
        target = if (target.contains(" ") || (!target.contains(".") && !target.startsWith("http"))) {
            "https://www.google.com/search?q=" + URLEncoder.encode(target, "UTF-8")
        } else if (!target.startsWith("http://") && !target.startsWith("https://")) "https://$target" else target
        current().web.loadUrl(target)
    }

    private fun showOnlyActive() { tabs.forEachIndexed { i, tab -> tab.web.visibility = if (i == active) View.VISIBLE else View.GONE }; updateChrome() }
    private fun current() = tabs[active]
    private fun activeTab() = tabs.getOrElse(active) { tabs.first() }
    private fun updateChrome() {
        if (tabs.isEmpty()) return
        address.setText(current().web.url?.takeIf { !it.startsWith("data:") } ?: "")
        pageTitle.text = "  " + (if (privateMode) "PRIVATE SPACE  •  " else "AURORA  •  ") + current().title.uppercase(Locale.getDefault()).take(42)
        tabCount.text = tabs.size.toString()
    }

    private fun showTabs() {
        val names = tabs.mapIndexed { i, t -> "${if (i == active) "● " else "○ "}${t.title}" }.toTypedArray()
        AlertDialog.Builder(this).setTitle("Open spaces (${tabs.size})").setItems(names) { _, which -> active = which; showOnlyActive() }
            .setNegativeButton("New private tab") { _, _ -> privateMode = true; addTab() }
            .setNeutralButton("Close current") { _, _ -> closeCurrent() }.show()
    }

    private fun closeCurrent() {
        if (tabs.size == 1) { current().web.loadDataWithBaseURL(null, home(), "text/html", "UTF-8", null); return }
        val gone = tabs.removeAt(active); webContainer.removeView(gone.web); gone.web.destroy(); active = (active - 1).coerceAtLeast(0); showOnlyActive()
    }

    private fun showMenu() {
        val items = arrayOf("Reload", "Share page", "Find in page", "Clear browsing data", "About Aurora")
        AlertDialog.Builder(this).setItems(items) { _, i -> when (i) {
            0 -> current().web.reload()
            1 -> share()
            2 -> find()
            3 -> clearData()
            4 -> AlertDialog.Builder(this).setTitle("Aurora").setMessage("A calm, privacy-minded web browser.\n\nTracking protection is enforced by your chosen search and site settings.").setPositiveButton("OK", null).show()
        } }.show()
    }
    private fun share() { startActivity(android.content.Intent.createChooser(android.content.Intent(android.content.Intent.ACTION_SEND).apply { type = "text/plain"; putExtra(android.content.Intent.EXTRA_TEXT, current().web.url) }, "Share page")) }
    private fun find() { val input = EditText(this); input.hint = "Find text"; AlertDialog.Builder(this).setTitle("Find on page").setView(input).setPositiveButton("Find") { _, _ -> current().web.findAllAsync(input.text.toString()) }.setNegativeButton("Cancel", null).show() }
    private fun clearData() { WebStorage.getInstance().deleteAllData(); CookieManager.getInstance().removeAllCookies(null); current().web.clearCache(true); Toast.makeText(this, "Browsing data cleared", Toast.LENGTH_SHORT).show() }
    override fun onBackPressed() { if (current().web.canGoBack()) current().web.goBack() else super.onBackPressed() }

    private fun textButton(text: String, size: Float, action: () -> Unit) = TextView(this).apply { this.text = text; textSize = size; gravity = Gravity.CENTER; setTextColor(mist); setOnClickListener { action() }; background = selectable() }
    private fun pill(color: Int, radius: Int) = GradientDrawable().apply { setColor(color); cornerRadius = dp(radius).toFloat() }
    private fun outlinedPill() = GradientDrawable().apply { setColor(panel); cornerRadius = dp(14).toFloat(); setStroke(dp(1), Color.rgb(82, 98, 114)) }
    private fun selectable() = android.graphics.drawable.ColorDrawable(Color.TRANSPARENT)
    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()

    private fun home() = """<!doctype html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'><style>body{margin:0;background:#f7f8f5;color:#17231e;font-family:sans-serif;padding:44px 25px} .mark{width:55px;height:55px;border-radius:18px;background:#b9f6d5;display:grid;place-items:center;font-size:30px;font-weight:bold}h1{font-size:38px;margin:30px 0 5px;letter-spacing:-1px}p{color:#5d6b63;line-height:1.55}.card{margin-top:32px;padding:20px;border-radius:20px;background:white;box-shadow:0 6px 25px #dce4de}.dot{color:#159c65;font-size:18px}small{color:#738178}</style></head><body><div class='mark'>A</div><h1>Make space<br>for the web.</h1><p>Your quiet corner of the internet. Search from the bar above or start somewhere familiar.</p><div class='card'><span class='dot'>●</span> <b>Private by design</b><p style='margin-bottom:0'>Aurora keeps its interface simple, puts controls within reach, and does not add an account layer.</p></div></body></html>"""
    private data class BrowserTab(val web: WebView, var title: String)
}
