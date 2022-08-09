package com.dongpop.urin.global.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Pointcut("within(com.dongpop.urin..controller..*)")
    public void onRequest() { }

    @Around("onRequest()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String params = getParams(joinPoint);
        log.info("Controller Method = {}, params = {}", joinPoint.getSignature().getName(), params);
        Object result = joinPoint.proceed();

        return result;
    }

    private String getParams(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        if (parameterNames.length == 0) {
            return "None";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < parameterNames.length; i++) {
            sb.append(parameterNames[i]).append(" : ").append(args[i]);
            if (i != parameterNames.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");

        return sb.toString();
    }
}
