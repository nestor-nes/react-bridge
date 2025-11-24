package com.sitefinder.wellsitenavigator.usa.maps.navigation

import android.content.Context
import android.webkit.WebView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class NavigationModuleView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val webView = WebView(context).also {
    addView(it)
  }
}
