# Build stage
FROM golang:1.21-alpine AS builder

# Install build dependencies for CGO (needed for SQLite)
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application with CGO enabled for SQLite (without static linking)
RUN CGO_ENABLED=1 go build -o synapmentor-backend cmd/server/main.go

# Final stage
FROM alpine:latest

# Install runtime dependencies
RUN apk --no-cache add ca-certificates sqlite

# Create app directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/synapmentor-backend .

# Make binary executable
RUN chmod +x synapmentor-backend

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose port
EXPOSE 8081

# Run the application
CMD ["./synapmentor-backend"]
