package com.agendapro.common;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class FormattingUtils {

  private static final Locale PT_BR = new Locale("pt", "BR");
  private static final Pattern DIGITS = Pattern.compile("(\\d+)");

  private FormattingUtils() {}

  public static int parseDurationMinutes(String value) {
    if (value == null || value.isBlank()) {
      return 0;
    }

    Matcher matcher = DIGITS.matcher(value);
    if (matcher.find()) {
      return Integer.parseInt(matcher.group(1));
    }
    return 0;
  }

  public static String formatDurationMinutes(int minutes) {
    return minutes + " min";
  }

  public static int parsePriceToCents(String value) {
    if (value == null || value.isBlank()) {
      return 0;
    }

    String sanitized = value.replaceAll("[^0-9,.-]", "").replace(".", "").replace(",", ".");
    if (sanitized.isBlank()) {
      return 0;
    }

    BigDecimal decimal = new BigDecimal(sanitized);
    return decimal.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP).intValueExact();
  }

  public static String formatPrice(int cents) {
    return NumberFormat.getCurrencyInstance(PT_BR).format(cents / 100.0);
  }
}
