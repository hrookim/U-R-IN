package com.dongpop.urin.domain.analysis.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnalysisCacheDto {
    private double dividend;
    private double divisor;
    private double data;

    public void addValues(double dividend, double divisor) {
        this.dividend += dividend;
        this.divisor += divisor;
    }

    public double calculatePercentageData() {
        return data = dividend * 100 / divisor;
    }

    public double calculatePerMinute() {
        return data = dividend * 60 / divisor;
    }
}
