package com.waves.userservice.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.CommonErrorHandler;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    @Bean
    ConsumerFactory<String,Long> consumerFactory(
            @Value("${spring.kafka.consumer.bootstrap-servers}") String bootstrapServers){

        Map<String,Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "host-request-approved");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, LongDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                new LongDeserializer()
//                        .ignoreTypeHeaders()
//                        .trustedPackages("*")
        );
    }

    @Bean
    ConcurrentKafkaListenerContainerFactory<String, Long> kafkaListenerContainerFactory(
            ConsumerFactory<String, Long> consumerFactory,
            CommonErrorHandler commonErrorHandler
    ) {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, Long>();
        factory.setConsumerFactory(consumerFactory);
        factory.setCommonErrorHandler(commonErrorHandler);
        return factory;
    }

    @Bean
    CommonErrorHandler kafkaErrorHandler() {
        return new KafkaErrorHandler();
    }

}
