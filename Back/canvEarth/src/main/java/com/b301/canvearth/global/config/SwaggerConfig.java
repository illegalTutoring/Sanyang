package com.b301.canvearth.global.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.media.*;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(
                        new Components()
                                .addSecuritySchemes("accessToken", new SecurityScheme()
                                        .type(SecurityScheme.Type.APIKEY)
                                        .in(SecurityScheme.In.HEADER)
                                        .name("accessToken")
                                )
                                .addSecuritySchemes("refreshToken", new SecurityScheme()
                                        .type(SecurityScheme.Type.APIKEY)
                                        .in(SecurityScheme.In.COOKIE)
                                        .name("refreshToken")
                                )
                )
                .paths(new Paths()
                        .addPathItem("/api/user/login", new PathItem()
                                .post(new Operation()
                                        .tags(List.of("user"))
                                        .operationId("login")
                                        .summary("REQ-USER-01")
                                        .description("로그인(Access, Refresh 토큰 발급)")
                                        .requestBody(new RequestBody()
                                                .content(new Content()
                                                        .addMediaType("multipart/form-data", new MediaType()
                                                                .schema(new ObjectSchema()
                                                                        .addProperty("username", new StringSchema()
                                                                                .description("User's username")
                                                                        )
                                                                        .addProperty("password", new StringSchema()
                                                                                .description("User's password")
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                        .responses(new ApiResponses()
                                                .addApiResponse("200", new ApiResponse()
                                                        .description("Successful login")
                                                        .content(new Content()
                                                                .addMediaType("application/json", new MediaType()
                                                                        .schema(new Schema<>()
                                                                                .addProperty("message", new StringSchema())
                                                                        )
                                                                )
                                                        )
                                                )
                                                .addApiResponse("401", new ApiResponse()
                                                        .description("Unauthorized")
                                                        .content(new Content()
                                                                .addMediaType("application/json", new MediaType()
                                                                        .schema(new Schema<>()
                                                                                .addProperty("message", new StringSchema())
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                        .addPathItem("api/user/logout", new PathItem()
                                .post(new Operation()
                                        .tags(List.of("user"))
                                        .operationId("logout")
                                        .summary("REQ-USER-02")
                                        .description("로그인(Access, Refresh 토큰 발급)")
                                        .responses(new ApiResponses()
                                                .addApiResponse("200", new ApiResponse()
                                                        .description("Successful login")
                                                        .content(new Content()
                                                                .addMediaType("application/json", new MediaType()
                                                                        .schema(new Schema<>()
                                                                                .addProperty("message", new StringSchema())
                                                                        )
                                                                )
                                                        )
                                                )
                                                .addApiResponse("401", new ApiResponse()
                                                        .description("Unauthorized")
                                                        .content(new Content()
                                                                .addMediaType("application/json", new MediaType()
                                                                        .schema(new Schema<>()
                                                                                .addProperty("message", new StringSchema())
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                        .security(new ArrayList<>(
                                                Arrays.asList(
                                                        new SecurityRequirement().addList("bearerAuth"),
                                                        new SecurityRequirement().addList("refreshToken")
                                                )
                                        ))
                                )
                        )
                );
    }

}
