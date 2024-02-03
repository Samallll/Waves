package com.waves.emailservice.config;

import com.waves.emailservice.model.EmailDto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.CommonErrorHandler;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
class KafkaConfig {

    @Bean
    ConsumerFactory<String, EmailDto> consumerFactory(
            @Value("${spring.kafka.consumer.bootstrap-servers}") String bootstrapServers
    ) {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "email");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//        JsonDeserializer<EmailDto> payloadJsonDeserializer = new JsonDeserializer<>();
//        payloadJsonDeserializer.addTrustedPackages("*");
//        return new DefaultKafkaConsumerFactory<>(
//                props,
//                new StringDeserializer(),
//                payloadJsonDeserializer
//        );
        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                new JsonDeserializer<>(EmailDto.class)
                        .ignoreTypeHeaders()
                        .trustedPackages("*")
        );
    }

    @Bean
    ConcurrentKafkaListenerContainerFactory<String, EmailDto> kafkaListenerContainerFactory(
            ConsumerFactory<String, EmailDto> consumerFactory,
            CommonErrorHandler commonErrorHandler
    ) {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, EmailDto>();
        factory.setConsumerFactory(consumerFactory);
        factory.setCommonErrorHandler(commonErrorHandler);
        return factory;
    }

    @Bean
    CommonErrorHandler kafkaErrorHandler() {
        return new KafkaErrorHandler();
    }

}
